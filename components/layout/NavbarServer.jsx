import { createClient } from "@/utils/supabase/server";
import initTranslations from "@/app/i18n";
import NavbarClient from "./NavbarClient";

const Navbar = async ({ locale }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavbarClient user={user} locale={locale} />;
};

export default Navbar;
