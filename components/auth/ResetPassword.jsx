"use client";

import { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/actions/auth";
import { useTranslation } from "react-i18next";
import InputField from "@/components/ui/InputField";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await resetPassword(formData, searchParams.get("code"));

    if (result.status === "success") {
      router.push("/");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <InputField
          type="password"
          name="password"
          id="password"
          placeholder={t("password")}
        />

        <div className="mt-4">
          <AuthButton type="reset_password" loading={loading} />
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
