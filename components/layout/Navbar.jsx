import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Logout from "../auth/Logout";
import initTranslations from "@/app/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import NeumorphicNavLink from "@/components/ui/NeumorphicNavLink";

const Navbar = async ({ locale }) => {
  const { t } = await initTranslations(locale, ["home"]);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b bg-background w-full">
      <div className="flex w-full items-center justify-end px-4 py-4 gap-x-5">
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
    </nav>
  );
};

export default Navbar;
