import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Logout from "./Logout";
import initTranslations from "@/app/i18n";
import { extractLocale } from "@/lib/locale";

const Navbar = async ({ locale }) => {
  const { t } = await initTranslations(locale, ["home"]);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b bg-background w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          {user && <Link href="/restaurant">Restaurant</Link>}
        </div>
        <div className="flex items-center gap-x-5">
          {!user ? (
            <Link href="/login">
              <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
                {t("login")}
              </div>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-x-2 text-sm">
                {user?.email}
              </div>
              <Logout />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
