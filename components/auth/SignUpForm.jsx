"use client";

import { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signUp } from "@/actions/auth";
import { useTranslation } from "react-i18next";
import InputField from "@/components/ui/InputField";

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signUp(formData);

    if (result.status === "success") {
      router.push("/login");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <InputField type="email" name="email" id="email" placeholder="Email" />
        <InputField
          type="password"
          name="password"
          id="password"
          placeholder={t("password")}
        />
        <div className="mt-4">
          <AuthButton type="sign_up" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
