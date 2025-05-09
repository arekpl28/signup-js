import initTranslations from "@/app/i18n";
import ResetPassword from "@/components/auth/ResetPassword";
import { extractLocale } from "@/lib/locale";
import NeumorphicCard from "@/components/ui/NeumorphicCard";

export default async function ResetPasswordPage(props) {
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);
  return (
    <div className="w-full flex mt-20 justify-center">
      <NeumorphicCard>
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          {t("reset_password")}
        </h1>
        <ResetPassword />
      </NeumorphicCard>
    </div>
  );
}
