"use client";

import { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signIn } from "@/actions/auth";
import { useTranslation } from "react-i18next";
import InputField from "@/components/ui/InputField";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signIn(formData);

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
        <div>
          <InputField
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div>
          <InputField
            type="password"
            name="password"
            id="password"
            placeholder={t("password")}
          />
        </div>
        <div className="mt-4">
          <AuthButton type="login" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
