import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { requireApiSession } from '@/lib/auth/session';
import { getPrisma } from '@/lib/db';

const ALLOWED = new Set(['w9', 'coi']);
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const { session, error } = await requireApiSession(['vendor']);
  if (error) return error;

  const form = await request.formData();
  const kindRaw = String(form.get('kind') ?? '');
  if (!ALLOWED.has(kindRaw)) {
    return NextResponse.json({ error: 'kind must be w9 or coi' }, { status: 400 });
  }
  const kind = kindRaw as 'w9' | 'coi';
  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'file required' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (8MB max)' }, { status: 400 });
  }

  const prisma = getPrisma();
  const vendor = await prisma.vendor.findUnique({ where: { userId: session.sub } });
  if (!vendor) {
    return NextResponse.json({ error: 'Vendor profile missing' }, { status: 404 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
  const dir = path.join(process.cwd(), 'data', 'uploads', vendor.id);
  await mkdir(dir, { recursive: true });
  const stored = `${kind}-${Date.now()}-${safeName}`;
  const storedPath = path.join(dir, stored);
  await writeFile(storedPath, Buffer.from(await file.arrayBuffer()));

  await prisma.complianceFile.create({
    data: {
      vendorId: vendor.id,
      kind,
      fileName: file.name,
      storedPath,
    },
  });

  await prisma.vendor.update({
    where: { id: vendor.id },
    data: kind === 'w9' ? { w9OnFile: true } : {},
  });

  return NextResponse.json({ ok: true, kind, fileName: file.name });
}
