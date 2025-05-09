"use client";

import { useState } from "react";
import AuthButton from "./AuthButton";
import { forgotPassword } from "@/actions/auth";
import InputField from "@/components/ui/InputField";

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await forgotPassword(formData);

    if (result.status === "success") {
      alert("Check your inbox for a password reset link.");
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

        <div className="mt-4">
          <AuthButton type="reset_password" loading={loading} />
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
