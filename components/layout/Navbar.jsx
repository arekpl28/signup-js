"use client";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Logout from "../auth/Logout";
import initTranslations from "@/app/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import NeumorphicNavLink from "@/components/ui/NeumorphicNavLink";
import { useState, useEffect } from "react";

const Navbar = async ({ locale }) => {
  const { t } = await initTranslations(locale, ["home"]);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavContent user={user} t={t} locale={locale} />;
};

function NavContent({ user, t, locale }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const close = () => setOpen(false);
      window.addEventListener("resize", close);
      return () => window.removeEventListener("resize", close);
    }
  }, []);

  return (
    <nav className="border-b bg-background w-full">
      {/* Desktop */}
      <div className="hidden sm:flex w-full items-center justify-end px-4 py-4 gap-x-5">
        <NeumorphicNavLink href="/">{t("restaurants")}</NeumorphicNavLink>
        {user && <NeumorphicNavLink href="/menu">Menu</NeumorphicNavLink>}
        {user && (
          <NeumorphicNavLink href="/contact">
            {t("your_restaurant")}
          </NeumorphicNavLink>
        )}
        {!user ? (
          <NeumorphicNavLink href="/login">{t("login")}</NeumorphicNavLink>
        ) : (
          <Logout />
        )}
        <LanguageSwitcher currentLocale={locale} />
      </div>

      {/* Mobile */}
      <div className="sm:hidden px-4 py-4 flex justify-between items-center">
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl text-[var(--foreground)] focus:outline-none"
        >
          ☰
        </button>
        <LanguageSwitcher currentLocale={locale} />
      </div>

      {open && (
        <div className="sm:hidden flex flex-col gap-4 px-6 py-6 rounded-xl mx-4 mb-4 bg-[var(--background)] shadow-[inset_4px_4px_8px_var(--shadow-dark),_inset_-4px_-4px_8px_var(--shadow-light)]">
          <NeumorphicNavLink href="/">{t("restaurants")}</NeumorphicNavLink>
          {user && <NeumorphicNavLink href="/menu">Menu</NeumorphicNavLink>}
          {user && (
            <NeumorphicNavLink href="/contact">
              {t("your_restaurant")}
            </NeumorphicNavLink>
          )}
          {!user ? (
            <NeumorphicNavLink href="/login">{t("login")}</NeumorphicNavLink>
          ) : (
            <Logout />
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
