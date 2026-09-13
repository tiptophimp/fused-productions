import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requestIp, requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

const bodySchema = z.object({
  documentId: z.string().uuid(),
  signedName: z.string().min(2).max(120),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['client']);
  if (error) return error;

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'documentId and signedName required' }, { status: 400 });
  }

  const prisma = getPrisma();
  const document = await prisma.document.findFirst({
    where: { id: parsed.data.documentId, event: { clientId: session.sub } },
  });
  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }
  if (document.status === 'signed') {
    return NextResponse.json({ error: 'Already signed' }, { status: 409 });
  }

  const updated = await prisma.document.update({
    where: { id: document.id },
    data: {
      status: 'signed',
      signedName: parsed.data.signedName.trim(),
      signedAt: new Date(),
      signerIp: requestIp(request),
    },
  });

  return NextResponse.json({
    ok: true,
    documentId: updated.id,
    status: updated.status,
    signedAt: updated.signedAt?.toISOString(),
  });
}
