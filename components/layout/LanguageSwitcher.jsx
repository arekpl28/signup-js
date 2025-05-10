"use client";

import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import i18nConfig from "@/i18nConfig";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale: currentLocale } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const search = query ? `?${query}` : "";

  // Usuń stary prefix języka z pathname
  const localePattern = new RegExp(
    `^/(${i18nConfig.locales.join("|")})(?=/|$)`
  );
  const cleanPath = pathname.replace(localePattern, "") || "/";

  const changeLocale = (e) => {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale}; Path=/; SameSite=Lax`;
    window.location.href = `/${newLocale}${cleanPath}${search}`;
  };

  return (
    <div className="relative inline-block">
      <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 text-sm cursor-pointer">
        <Globe className="w-4 h-4 mr-1 text-gray-600" />
        <span>{currentLocale?.toUpperCase()}</span>
      </div>
      <select
        value={currentLocale || i18nConfig.defaultLocale}
        onChange={changeLocale}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        {i18nConfig.locales.map((lng) => (
          <option key={lng} value={lng}>
            {lng.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
