"use client";

import { useState } from "react";
import { addRestaurant } from "@/actions/restaurantServer";
import { useCurrencies } from "@/utils/useCurrencies";
import { uploadRestaurantImage } from "@/utils/uploadRestaurantImage";
import { useTranslation } from "react-i18next";

export default function RestaurantFormField({
  field,
  value,
  initialData,
  onDone,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [file, setFile] = useState(null);
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: currencies = [] } = useCurrencies();
  const [preview, setPreview] = useState(null);
  const { t } = useTranslation();

  const isTextarea = field === "description";
  const isSelect = field === "currency_code";
  const isImage = field === "image";

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("ID RESTAURACJI:", initialData.id);

    const formData = new FormData();
    formData.set("restaurant_id", initialData.id);

    // Główna różnica: zawsze przekazuj name!
    if (initialData.name) formData.set("name", initialData.name);

    if (isImage && file) {
      const url = await uploadRestaurantImage(file);
      if (!url) {
        setState({
          status: "error",
          message: t("image_upload_error"),
        });
        setLoading(false);
        return;
      }
      formData.set("image_url", url);
    } else {
      if (field === "currency_code") {
        // jeśli nie wybrano waluty, usuń z formData (nie wysyłaj pustej wartości!)
        if (inputValue) {
          formData.set("currency_code", inputValue);
        } else {
          formData.delete("currency_code");
        }
      } else {
        formData.set(field, inputValue);
      }
    }

    // Dołóż resztę wartości z initialData, żeby nie nadpisać pustym (oprócz 'id')
    Object.entries(initialData).forEach(([k, v]) => {
      if (!formData.has(k) && k !== "id") formData.set(k, v || "");
    });

    const res = await addRestaurant({}, formData);
    setState(res);
    setLoading(false);
    if (res.status === "success") onDone();
  };

  if (isImage) {
    return (
      <form onSubmit={handleSave} className="flex flex-col gap-2">
        <label className="cursor-pointer justify-center text-sm flex items-center gap-2">
          {/* <span className="text-gray-600">{t("restaurant_image")}</span> */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const selected = e.target.files[0];
              setFile(selected);
              if (selected) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setPreview(e.target.result);
                };
                reader.readAsDataURL(selected);
              }
            }}
            className="hidden"
            required
          />
          <div className="px-4 py-2 rounded shadow-neumorphic bg-[var(--background)] text-[var(--foreground)] hover:brightness-95 transition text-sm cursor-pointer border border-transparent hover:border-gray-300">
            📷 {t("choose_file")}
          </div>
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-xs h-32 object-cover rounded-xl border"
          />
        )}

        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="text-gray-500 text-sm px-2"
            onClick={onDone}
            disabled={loading}
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="text-blue-600 text-sm px-2"
            disabled={loading}
          >
            {loading ? t("uploading") : t("save")}
          </button>
        </div>

        {state?.status === "error" && (
          <span className="text-red-600 text-xs text-center">
            {state.message}
          </span>
        )}
      </form>
    );
  }

  // Pozostałe pola (tekstowe, textarea, select)
  return (
    <form onSubmit={handleSave} className="flex gap-2 items-center">
      {isSelect ? (
        <select
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        >
          <option value="">{t("select_currency")}</option>
          {currencies.map((cur) => (
            <option key={cur.code} value={cur.code}>
              {cur.name} ({cur.symbol})
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          className="w-full px-3 py-2 rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder:text-gray-500 shadow-[inset_4px_4px_8px_var(--shadow-dark),inset_-4px_-4px_8px_var(--shadow-light)] focus:outline-none focus:shadow-neumorphic-inset transition-shadow"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={2}
        />
      ) : (
        <input
          className="w-full px-3 py-2 rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder:text-gray-500 shadow-[inset_4px_4px_8px_var(--shadow-dark),inset_-4px_-4px_8px_var(--shadow-light)] focus:outline-none focus:shadow-neumorphic-inset transition-shadow"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      <button
        type="button"
        className="text-gray-500 text-sm px-2"
        onClick={onDone}
        disabled={loading}
      >
        {t("cancel")}
      </button>
      <button
        type="submit"
        className="text-blue-600 text-sm px-2"
        disabled={loading}
      >
        {loading ? t("uploading") : t("save")}
      </button>
      {state?.status === "error" && (
        <span className="text-red-600 ml-2 text-xs">{state.message}</span>
      )}
    </form>
  );
}
