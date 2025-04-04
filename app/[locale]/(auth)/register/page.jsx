import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from "react";
import initTranslations from "@/app/i18n";

import { extractLocale } from "@/lib/locale";

const SignUp = async (props) => {
  const locale = await extractLocale(props);
  const { t } = await initTranslations(locale, ["home"]);

  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">
          {t("sign_up")}
        </h1>
        <SignUpForm />
        <div className="mt-2 flex items-center">
          <h1>{t("already_have_an_account")}</h1>
          <Link className="font-bold ml-2" href="/login">
            {t("sign_in")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
