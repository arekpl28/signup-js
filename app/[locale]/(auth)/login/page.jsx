import initTranslations from "@/app/i18n";
import LoginForm from "@/components/auth/LoginForm";
import LoginGithub from "@/components/auth/LoginGithub";
import { extractLocale } from "@/lib/locale";
import Link from "next/link";
import NeumorphicCard from "@/components/ui/NeumorphicCard";

export default async function LoginPage(props) {
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <div className="w-full flex mt-20 justify-center">
      <NeumorphicCard>
        <h1 className="text-3xl w-full text-center font-bold mb-6 text-[var(--foreground)]">
          {t("sign_in")}
        </h1>
        <LoginForm />
        <LoginGithub />
        <div className="mt-4 text-center text-[var(--foreground)] text-sm">
          <p>
            {t("don't_have_an_account")}{" "}
            <Link className="font-bold underline" href="/register">
              {t("sign_up")}
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center text-[var(--foreground)] text-sm">
          <span>{t("forgot_your_password")}</span>
          <Link className="font-bold underline" href="/forgot-password">
            {t("reset_password")}
          </Link>
        </div>
      </NeumorphicCard>
    </div>
  );
}
