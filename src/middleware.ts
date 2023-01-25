import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (session && ['/login', '/register', '/'].includes(path)) {
    return NextResponse.redirect(new URL('/protected', req.url));
  }

  console.log('hiiii');
  return NextResponse.next();
}