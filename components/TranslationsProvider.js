"use client";

import { I18nextProvider } from "react-i18next";
import initTranslations from "@/app/i18n"; // lub '@/lib/i18n' zależnie gdzie masz
import { createInstance } from "i18next";
import { useEffect, useState } from "react";

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}) {
  const [i18n, setI18n] = useState();

  useEffect(() => {
    const init = async () => {
      const instance = createInstance();
      await initTranslations(locale, namespaces, instance, resources);
      setI18n(instance);
    };
    init();
  }, [locale, namespaces, resources]);

  if (!i18n) return null; // lub spinner jeśli chcesz

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
