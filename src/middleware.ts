import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const unprotectedBasePaths = [
  '/',
  '/login',
  '/register',
] as const;

const protectedBasePaths = [
  '/dashboard',
  '/search',
  '/shelves',
] as const;

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = isProtectedPath(path);
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // not logged in trying to access protected route
  if (!session && isProtected)
    return NextResponse.redirect(new URL('/login', req.url));

  // logged in trying to access an unprotected route
  if (session && !isProtected)
    return NextResponse.redirect(new URL('/dashboard', req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    // unprotected base paths
    '/',
    '/login',
    '/register',
    // protected base paths
    '/dashboard',
    '/search',
    '/shelves',
  ],
};

function isProtectedPath(path: string): boolean {
  let isProtected = false;
  protectedBasePaths.forEach((protectedBasePath) => {
    if (path.startsWith(protectedBasePath)) {
      isProtected = true;
    }
  });
  return isProtected;
}