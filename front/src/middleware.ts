import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n/config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}${pathname}`, request.url),
    );
  }
}

export const config = {
  // Exclude: Next.js internals, API routes, asset folders, and any path that looks like a file (has an extension)
  matcher: ["/((?!api|_next/static|_next/image|models|images|favicon\\.ico|[^/]+\\.[a-zA-Z0-9]+$).+)"],
};
