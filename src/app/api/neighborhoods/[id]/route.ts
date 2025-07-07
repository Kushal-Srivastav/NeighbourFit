import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

// Admin check helper (assumes user object has isAdmin property or check by email)
async function isAdmin(userId: string) {
  // TODO: implement actual admin check logic
  // For demo, treat a specific email as admin
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user && user.email.endsWith('@admin.com');
}

// Edit a neighborhood (admin only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!(await isAdmin(userId))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const neighborhoodId = Number(params.id);
  const data = await request.json();
  const updated = await prisma.neighborhood.update({ where: { id: neighborhoodId }, data });
  return NextResponse.json(updated);
}

// Delete a neighborhood (admin only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!(await isAdmin(userId))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const neighborhoodId = Number(params.id);
  await prisma.neighborhood.delete({ where: { id: neighborhoodId } });
  return NextResponse.json({ success: true });
}
