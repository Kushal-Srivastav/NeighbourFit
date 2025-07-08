import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!.+\.[\w]+$|_next).*)', // Protect all routes except static files and Next.js internals
    '/api/(.*)', // Protect API routes
  ],
};
