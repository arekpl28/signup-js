import ForgotPassword from "@/components/ForgotPassword";
import initTranslations from "@/app/i18n";
import { extractLocale } from "@/lib/locale";

export default async function ForgotPasswordPage(props) {
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          {t("password_reset")}
        </h1>
        <ForgotPassword />
      </section>
    </div>
  );
}
