import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const passcode = request.cookies.get('passcode')?.value;
  if (passcode !== 'SummitSucks' && request.nextUrl.pathname !== '/coming-soon') {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!coming-soon|api|static|.*\\..*).*)',
};