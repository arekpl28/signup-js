"use client";

import { useState } from "react";
import { signOut } from "@/actions/auth";
import { useTranslation } from "react-i18next";

const Logout = ({ onClick }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogout = async (event) => {
    event.preventDefault();

    if (onClick) onClick();

    setTimeout(async () => {
      setLoading(true);
      await signOut();
      setLoading(false);
    }, 100);
  };

  return (
    <form onSubmit={handleLogout} className="w-auto">
      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 rounded-xl bg-[var(--background)] text-[var(--foreground)] text-sm shadow-[4px_4px_8px_var(--shadow-dark),_-4px_-4px_8px_var(--shadow-light)] transition hover:brightness-95 active:shadow-[inset_2px_2px_5px_var(--shadow-dark),_inset_-2px_-2px_5px_var(--shadow-light)]"
      >
        {loading ? t("signing_out") : t("sign_out")}
      </button>
    </form>
  );
};

export default Logout;
