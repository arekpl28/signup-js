"use client";

import { useState } from "react";
import { signOut } from "@/actions/auth";
import { useTranslation } from "react-i18next";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogout = async (event) => {
    event.preventDefault();
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  return (
    <div className="bg-gray-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer">
      <form onSubmit={handleLogout}>
        <button type="submit" disabled={loading}>
          {loading ? t("signing_out") : t("sign_out")}
        </button>
      </form>
    </div>
  );
};

export default Logout;
