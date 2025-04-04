import { useTranslation } from "react-i18next";

const AuthButton = (props) => {
  const { type, loading } = props;
  const { t } = useTranslation("home");

  return (
    <button
      disabled={loading}
      type="submit"
      className={`${
        loading ? "bg-gray-600" : "bg-blue-600"
      } rounded-md w-full px-12 py-3 text-sm font-medium text-white`}
    >
      {loading ? t("loading") : t(type)}
    </button>
  );
};

export default AuthButton;
