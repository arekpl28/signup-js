import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    return await updateSession(request);
  }

  const response = await updateSession(request);
  const i18nResponse = i18nRouter(request, i18nConfig);
  response.headers.forEach((value, key) => {
    i18nResponse.headers.set(key, value);
  });

  return i18nResponse;
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
