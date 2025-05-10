import i18nConfig from "@/i18nConfig";

export function getPathWithoutLocale(pathname) {
  const localePattern = new RegExp(
    `^/(${i18nConfig.locales.join("|")})(?=/|$)`
  );
  return pathname.replace(localePattern, "") || "/";
}
