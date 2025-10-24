import { NextResponse } from 'next/server';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/mobile', request.url));
  }

  return NextResponse.next();
}