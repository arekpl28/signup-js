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
            : "bg-[var(--background)] text-[var(--foreground)] shadow-neumorphic hover:brightness-95 active:shadow-neumorphic-inset"
        }
      `}
    >
      {loading ? t("loading") : t(type)}
    </button>
  );
};

export default AuthButton;
