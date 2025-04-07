import initTranslations from "@/app/i18n";
import LoginForm from "@/components/auth/LoginForm";
import LoginGithub from "@/components/auth/LoginGithub";
import { extractLocale } from "@/lib/locale";
import Link from "next/link";

export default async function LoginPage(props) {
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          {t("sign_in")}
        </h1>
        <LoginForm />
        <LoginGithub />
        <div className="mt-2 flex items-center">
          <h1>{t("don't_have_an_account")}</h1>
          <Link className="font-bold ml-2" href="/register">
            {t("sign_up")}
          </Link>
        </div>
        <div className="mt-2 flex items-center">
          <h1>{t("forgot_your_password")}</h1>
          <Link className="font-bold ml-2" href="/forgot-password">
            {t("reset_password")}
          </Link>
        </div>
      </section>
    </div>
  );
}
