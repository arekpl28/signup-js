import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Logout from "../auth/Logout";
import initTranslations from "@/app/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = async ({ locale }) => {
  const { t } = await initTranslations(locale, ["home"]);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link href="/" className="font-bold ">
          {t("restaurants")}
        </Link>
        {user && (
          <Link className="font-bold" href="/menu">
            Menu
          </Link>
        )}

        <div className="flex items-center gap-x-5">
          {user && <Link href="/contact">Twoja restauracja</Link>}
        </div>
        <div className="flex items-center gap-x-5">
          {!user ? (
            <Link href="/login">
              <div className="px-4 py-2 rounded-xl bg-[var(--background)] text-[var(--foreground)] text-sm shadow-[4px_4px_8px_var(--shadow-dark),_-4px_-4px_8px_var(--shadow-light)] transition hover:brightness-95 active:shadow-[inset_2px_2px_5px_var(--shadow-dark),_inset_-2px_-2px_5px_var(--shadow-light)]">
                {t("login")}
              </div>
            </Link>
          ) : (
            <Logout />
          )}
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
