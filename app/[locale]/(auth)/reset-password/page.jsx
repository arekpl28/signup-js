import initTranslations from "@/app/i18n";
import ResetPassword from "@/components/auth/ResetPassword";
import { extractLocale } from "@/lib/locale";

export default async function ResetPasswordPage(props) {
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          {t("reset_password")}
        </h1>
        <ResetPassword />
      </section>
    </div>
  );
}
