import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

const schema = z.object({
  milestoneId: z.string().uuid(),
  status: z.enum(['pending', 'paid', 'overdue']),
});

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['admin']);
  if (error) return error;

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'milestoneId and status required' }, { status: 400 });
  }

  await getPrisma().milestone.update({
    where: { id: parsed.data.milestoneId },
    data: { status: parsed.data.status },
  });
  return NextResponse.json({ ok: true });
}
