/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

export const locales = [
  "en",
  "zh",
  "ja",
  "ko",
  "ru",
  "es",
  "vi",
  "id",
  "th",
  "pt",
  "tr",
];
const defaultLocale = "en";

function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    return defaultLocale;
  }
  return pathname.split("/")[1];
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return createMiddleware({
    locales,
    defaultLocale,
  })(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
