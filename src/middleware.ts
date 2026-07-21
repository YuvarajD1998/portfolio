import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware — gate the development showcase out of production (Sprint 02 §12).
 *
 * The `/showcase` surface is a validation tool, never part of the shipped
 * portfolio. In a production build we rewrite any `/showcase*` request to the
 * 404 route, so the route exists for development and CI but is unreachable in
 * production. (The route is also `noindex` for defence in depth.)
 */
export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === 'production' &&
    request.nextUrl.pathname.startsWith('/showcase')
  ) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/showcase/:path*', '/showcase'],
};
