import { useTranslation } from "react-i18next";

const AuthButton = (props) => {
  const { type, loading } = props;
  const { t } = useTranslation("home");

  return (
    <button
      disabled={loading}
      type="submit"
      className={`w-full px-6 py-3 rounded-xl text-sm font-semibold transition
        ${
          loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[var(--background)] text-[var(--foreground)] shadow-[4px_4px_8px_var(--shadow-dark),_-4px_-4px_8px_var(--shadow-light)] hover:brightness-95 active:shadow-[inset_2px_2px_5px_var(--shadow-dark),_inset_-2px_-2px_5px_var(--shadow-light)]"
        }
      `}
    >
      {loading ? t("loading") : t(type)}
    </button>
  );
};

export default AuthButton;
