import { randomBytes } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { getPrisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';

export function temporaryPassword() {
  return randomBytes(9).toString('base64url');
}

export function msaBody() {
  const file = path.join(process.cwd(), 'docs', 'contracts', 'customers', 'fused-productions-customer-msa.md');
  return existsSync(file) ? readFileSync(file, 'utf8') : 'Fused Productions Master Service Agreement';
}

export function slaBody() {
  const file = path.join(process.cwd(), 'docs', 'contracts', 'vendors', 'fused-productions-vendor-sla.md');
  return existsSync(file) ? readFileSync(file, 'utf8') : 'Fused Productions Subcontractor Agreement & SLA';
}

export function milestoneSchedule(eventDate: Date, total: number) {
  const retainerDue = new Date();
  const planningDue = new Date(eventDate);
  planningDue.setDate(planningDue.getDate() - 60);
  const finalDue = new Date(eventDate);
  finalDue.setDate(finalDue.getDate() - 14);
  return [
    { milestoneName: 'Initial Retainer', percentage: 30, amount: roundMoney(total * 0.3), dueDate: retainerDue },
    { milestoneName: 'Planning Phase Draw', percentage: 40, amount: roundMoney(total * 0.4), dueDate: planningDue },
    { milestoneName: 'Final Settlement', percentage: 30, amount: roundMoney(total * 0.3), dueDate: finalDue },
  ];
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export function parseDateInput(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T12:00:00`);
  }
  return new Date(value);
}

export async function ensureClient(email: string, name: string) {
  const prisma = getPrisma();
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    if (existing.role !== 'client') {
      throw new Error('That email is already used by a non-client account');
    }
    return { user: existing, temporaryPassword: null as string | null };
  }
  const password = temporaryPassword();
  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      role: 'client',
      passwordHash: await hashPassword(password),
    },
  });
  return { user, temporaryPassword: password };
}

export async function createEventWithDraws(input: {
  clientId: string;
  eventName: string;
  eventDate: Date;
  total: number;
  venue?: string;
  runSheet?: string;
}) {
  const prisma = getPrisma();
  const event = await prisma.event.create({
    data: {
      clientId: input.clientId,
      eventName: input.eventName,
      eventDate: input.eventDate,
      status: 'contracted',
      totalContractPrice: input.total,
      venue: input.venue,
      phase: 'Design Approval',
      runSheet: input.runSheet,
      milestones: { create: milestoneSchedule(input.eventDate, input.total) },
      documents: {
        create: { title: 'Master Service Agreement', body: msaBody() },
      },
    },
    include: { milestones: true },
  });
  return event;
}
