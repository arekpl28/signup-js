import ForgotPassword from "@/components/auth/ForgotPassword";
import initTranslations from "@/app/i18n";
import { extractLocale } from "@/lib/locale";
import NeumorphicCard from "@/components/ui/NeumorphicCard";
import Link from "next/link";

export default async function ForgotPasswordPage(props) {
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <div className="w-full flex mt-20 justify-center">
      <NeumorphicCard>
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          {t("password_reset")}
        </h1>
        <ForgotPassword />
        <div className="mt-4 text-center text-[var(--foreground)] text-sm">
          <p>
            {t("already_have_an_account")}{" "}
            <Link className="font-bold underline" href="/login">
              {t("sign_in")}
            </Link>
          </p>
        </div>
      </NeumorphicCard>
    </div>
  );
}
