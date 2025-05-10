"use client";

import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import i18nConfig from "@/i18nConfig";
import { Globe } from "lucide-react";
import NeumorphicButtonWrapper from "@/components/ui/NeumorphicButtonWrapper";

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
      <NeumorphicButtonWrapper>
        <Globe className="w-4 h-4 mr-2 text-[var(--foreground)]" />
        <span>{currentLocale?.toUpperCase()}</span>
      </NeumorphicButtonWrapper>
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
