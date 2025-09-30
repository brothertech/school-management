import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig } from './config/i18nConfig';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files and API routes
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already contains a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`
  );

  // For this app, we're using client-side translation, not server-side routing
  // So we should NOT redirect to locale-specific paths that don't exist
  // Instead, let the client-side components handle the language switching
  
  // If someone tries to access a locale-specific path that doesn't exist,
  // redirect them to the base path without the locale
  if (pathnameHasLocale) {
    const localeMatch = pathname.match(new RegExp(`^/(${i18nConfig.locales.map(l => l.code).join('|')})`));
    if (localeMatch) {
      const locale = localeMatch[1];
      const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
      
      // Create new URL without locale
      const newUrl = new URL(pathWithoutLocale, request.url);
      
      // Preserve query parameters
      newUrl.search = request.nextUrl.search;
      
      // Set a cookie to remember the language preference
      const response = NextResponse.redirect(newUrl);
      response.cookies.set('NEXT_LOCALE', locale);
      
      return response;
    }
  }

  // Basic auth-aware redirects using cookie token
  const authToken = request.cookies.get('auth_token')?.value;
  console.log('authtoken is ', authToken);

  // If authenticated, prevent visiting auth pages
  if (authToken && pathname.startsWith('/auth')) {
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};