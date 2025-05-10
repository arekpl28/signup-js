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
  // Pobranie bieżącej locale bezpośrednio z dynamicznych parametrów trasy
  const { locale: currentLocale } = useParams();
  const router = useRouter();
  let pathname = usePathname(); // np. "/pl/login"
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const search = queryString ? `?${queryString}` : "";

  // Usuń istniejący prefiks języka z początku ścieżki
  const localePattern = new RegExp(
    `^/(${i18nConfig.locales.join("|")})(?=/|$)`
  );
  pathname = pathname.replace(localePattern, "") || "/";

  const changeLocale = (e) => {
    const newLocale = e.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale}; Path=/; SameSite=Lax`;
    // router.push(`/${newLocale}${pathname}${search}`);
    router.push(pathname + search, undefined, { locale: newLocale });
  };

  return (
    <div className="relative inline-block">
      {/* Widoczny przycisk z ikoną i kodem języka */}
      <div className="flex items-center  border border-gray-300 rounded-md px-2 py-1 text-sm cursor-pointer">
        <Globe className="w-4 h-4 mr-1 text-gray-600" />
        <span>{currentLocale?.toUpperCase()}</span>
      </div>
      {/* Niewidoczny select nad przyciskiem dla obsługi zmiany */}
      <select
        value={currentLocale || i18nConfig.defaultLocale}
        onChange={changeLocale}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        {i18nConfig.locales.map((l) => (
          <option key={l} value={l}>
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
