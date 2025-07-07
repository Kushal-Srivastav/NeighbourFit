import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

// Edit a review (author only)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const reviewId = Number(params.id);
  const data = await request.json();
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  if (review.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const updated = await prisma.review.update({ where: { id: reviewId }, data });
  return NextResponse.json(updated);
}

// Delete a review (author only)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const reviewId = Number(params.id);
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  if (review.userId !== userId) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  await prisma.review.delete({ where: { id: reviewId } });
  return NextResponse.json({ success: true });
}
