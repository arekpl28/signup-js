"use client";

import { useState } from "react";
import { addRestaurant } from "@/actions/restaurantServer";
import { useCurrencies } from "@/utils/useCurrencies";
import { uploadRestaurantImage } from "@/utils/uploadRestaurantImage"; // dodaj ten import

export default function RestaurantFormField({
  field,
  value,
  initialData,
  onDone,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [file, setFile] = useState(null); // do pliku
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: currencies = [] } = useCurrencies();

  // Typ pola
  const isTextarea = field === "description";
  const isSelect = field === "currency_code";
  const isImage = field === "image";

  // Submit tylko jednego pola
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.set("restaurant_id", initialData.id);

    if (isImage && file) {
      // Najpierw upload pliku do storage
      const url = await uploadRestaurantImage(file);
      if (!url) {
        setState({
          status: "error",
          message: "Błąd przy przesyłaniu zdjęcia!",
        });
        setLoading(false);
        return;
      }
      formData.set("image_url", url); // nazwa kolumny w bazie!
    } else {
      formData.set(field, inputValue);
    }

    // Dodaj pozostałe pola żeby nie nadpisać pustym
    Object.entries(initialData).forEach(([k, v]) => {
      if (!formData.has(k) && k !== "id") formData.set(k, v || "");
    });

    const res = await addRestaurant({}, formData);
    setState(res);
    setLoading(false);
    if (res.status === "success") onDone();
  };

  // UI
  if (isImage) {
    return (
      <form
        onSubmit={handleSave}
        className="flex gap-2 items-center text-black"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border px-2 py-1 rounded"
          required
        />
        <button
          type="submit"
          className="text-blue-600 text-sm px-2"
          disabled={loading}
        >
          {loading ? "Wysyłanie..." : "Zapisz"}
        </button>
        <button
          type="button"
          className="text-gray-500 text-sm px-2"
          onClick={onDone}
          disabled={loading}
        >
          Anuluj
        </button>
        {state?.status === "error" && (
          <span className="text-red-600 ml-2 text-xs">{state.message}</span>
        )}
      </form>
    );
  }

  // POZOSTAŁE POLA:
  return (
    <form onSubmit={handleSave} className="flex gap-2 items-center text-black">
      {isSelect ? (
        <select
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        >
          <option value="">Wybierz walutę</option>
          {currencies.map((cur) => (
            <option key={cur.code} value={cur.code}>
              {cur.name} ({cur.symbol})
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={2}
        />
      ) : (
        <input
          className="border px-2 py-1 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      <button
        type="submit"
        className="text-blue-600 text-sm px-2"
        disabled={loading}
      >
        {loading ? "Wysyłanie..." : "Zapisz"}
      </button>
      <button
        type="button"
        className="text-gray-500 text-sm px-2"
        onClick={onDone}
        disabled={loading}
      >
        Anuluj
      </button>
      {state?.status === "error" && (
        <span className="text-red-600 ml-2 text-xs">{state.message}</span>
      )}
    </form>
  );
}
