import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';
import { createEventWithDraws, ensureClient, parseDateInput, temporaryPassword } from '@/lib/ops/provision';
import { portalInviteBody, queuePortalMail } from '@/lib/ops/mail';

const createClient = z.object({
  action: z.literal('createClient'),
  name: z.string().min(2),
  email: z.string().email(),
});

const createVendor = z.object({
  action: z.literal('createVendor'),
  name: z.string().min(2),
  email: z.string().email(),
  companyName: z.string().min(2),
  serviceType: z.string().min(2),
});

const createEvent = z.object({
  action: z.literal('createEvent'),
  clientEmail: z.string().email(),
  clientName: z.string().min(2),
  eventName: z.string().min(2),
  eventDate: z.string().min(8),
  total: z.number().positive(),
  venue: z.string().optional(),
  runSheet: z.string().optional(),
});

const assignVendor = z.object({
  action: z.literal('assignVendor'),
  eventId: z.string().uuid(),
  vendorId: z.string().uuid(),
  loadInWindow: z.string().optional(),
  zoneNotes: z.string().optional(),
  cueNotes: z.string().optional(),
});

const completeEvent = z.object({
  action: z.literal('completeEvent'),
  eventId: z.string().uuid(),
  crewDebriefNotes: z.string().optional(),
});

const payInvoice = z.object({
  action: z.literal('payInvoice'),
  invoiceId: z.string().uuid(),
});

const convertInquiry = z.object({
  action: z.literal('convertInquiry'),
  inquiryId: z.string().uuid(),
  eventName: z.string().min(2),
  eventDate: z.string().min(8),
  total: z.number().positive(),
});

const updateEvent = z.object({
  action: z.literal('updateEvent'),
  eventId: z.string().uuid(),
  phase: z.string().optional(),
  status: z.enum(['prospect', 'contracted', 'planning', 'completed', 'cancelled']).optional(),
  venue: z.string().optional(),
  runSheet: z.string().optional(),
});

const schema = z.discriminatedUnion('action', [
  createClient,
  createVendor,
  createEvent,
  assignVendor,
  completeEvent,
  payInvoice,
  convertInquiry,
  updateEvent,
]);

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['admin']);
  if (error) return error;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid admin action' }, { status: 400 });
  }

  try {
    return await handleAdminAction(parsed.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Admin action failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

async function handleAdminAction(body: z.infer<typeof schema>) {
  const prisma = getPrisma();

  if (body.action === 'createClient') {
    const result = await ensureClient(body.email, body.name);
    if (result.temporaryPassword) {
      await queuePortalMail(
        result.user.email,
        'Fused Productions client portal',
        portalInviteBody('client', result.user.email, result.temporaryPassword)
      );
    }
    return NextResponse.json({
      ok: true,
      userId: result.user.id,
      temporaryPassword: result.temporaryPassword,
    });
  }

  if (body.action === 'createVendor') {
    const existing = await prisma.user.findUnique({ where: { email: body.email.toLowerCase() } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }
    const password = temporaryPassword();
    const user = await prisma.user.create({
      data: {
        email: body.email.toLowerCase(),
        name: body.name,
        role: 'vendor',
        passwordHash: await hashPassword(password),
        vendor: {
          create: {
            companyName: body.companyName,
            serviceType: body.serviceType,
          },
        },
      },
    });
    await queuePortalMail(
      user.email,
      'Fused Productions vendor portal',
      portalInviteBody('vendor', user.email, password)
    );
    return NextResponse.json({ ok: true, userId: user.id, temporaryPassword: password });
  }

  if (body.action === 'createEvent') {
    const { user, temporaryPassword: password } = await ensureClient(body.clientEmail, body.clientName);
    const event = await createEventWithDraws({
      clientId: user.id,
      eventName: body.eventName,
      eventDate: parseDateInput(body.eventDate),
      total: body.total,
      venue: body.venue,
      runSheet: body.runSheet,
    });
    if (password) {
      await queuePortalMail(
        user.email,
        'Fused Productions client portal',
        portalInviteBody('client', user.email, password)
      );
    }
    return NextResponse.json({
      ok: true,
      eventId: event.id,
      clientTemporaryPassword: password,
    });
  }

  if (body.action === 'assignVendor') {
    await prisma.eventAssignment.upsert({
      where: { eventId_vendorId: { eventId: body.eventId, vendorId: body.vendorId } },
      update: {
        loadInWindow: body.loadInWindow ? new Date(body.loadInWindow) : undefined,
        zoneNotes: body.zoneNotes,
        cueNotes: body.cueNotes,
      },
      create: {
        eventId: body.eventId,
        vendorId: body.vendorId,
        loadInWindow: body.loadInWindow ? new Date(body.loadInWindow) : undefined,
        zoneNotes: body.zoneNotes,
        cueNotes: body.cueNotes,
      },
    });
    return NextResponse.json({ ok: true });
  }

  if (body.action === 'completeEvent') {
    const surveyDue = new Date();
    surveyDue.setHours(surveyDue.getHours() + 48);
    await prisma.event.update({
      where: { id: body.eventId },
      data: {
        status: 'completed',
        phase: 'Complete',
        surveyDueAt: surveyDue,
        crewDebriefAt: new Date(),
        crewDebriefNotes: body.crewDebriefNotes,
      },
      include: { client: true },
    }).then(async (event) => {
      await queuePortalMail(
        event.client.email,
        'How did we do? Fused Productions',
        `Your event is complete. A short survey will be in your client portal.\n${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'}/client`
      );
      return event;
    });
    return NextResponse.json({ ok: true, surveyDueAt: surveyDue.toISOString() });
  }

  if (body.action === 'payInvoice') {
    await prisma.invoice.update({
      where: { id: body.invoiceId },
      data: { status: 'paid' },
    });
    return NextResponse.json({ ok: true });
  }

  if (body.action === 'updateEvent') {
    await prisma.event.update({
      where: { id: body.eventId },
      data: {
        ...(body.phase ? { phase: body.phase } : {}),
        ...(body.status ? { status: body.status } : {}),
        ...(body.venue !== undefined ? { venue: body.venue } : {}),
        ...(body.runSheet !== undefined ? { runSheet: body.runSheet } : {}),
      },
    });
    return NextResponse.json({ ok: true });
  }

  if (body.action !== 'convertInquiry') {
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.findUnique({ where: { id: body.inquiryId } });
  if (!inquiry) {
    return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
  }
  const name = `${inquiry.firstName} ${inquiry.lastName}`.trim();
  const { user, temporaryPassword: password } = await ensureClient(inquiry.email, name || inquiry.email);
  const event = await createEventWithDraws({
    clientId: user.id,
    eventName: body.eventName,
    eventDate: parseDateInput(body.eventDate),
    total: body.total,
  });
  if (password) {
    await queuePortalMail(
      user.email,
      'Fused Productions client portal',
      portalInviteBody('client', user.email, password)
    );
  }
  return NextResponse.json({
    ok: true,
    eventId: event.id,
    clientTemporaryPassword: password,
  });
}
