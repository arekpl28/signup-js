"use client";

import { useState } from "react";
import { addRestaurant } from "@/actions/restaurantServer";
import { useCurrencies } from "@/utils/useCurrencies";

export default function RestaurantFormField({
  field,
  value,
  initialData,
  onDone,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [state, setState] = useState(null);
  const { data: currencies = [] } = useCurrencies();

  // Ustalamy typ pola
  const isTextarea = field === "description";
  const isSelect = field === "currency_code";

  // Po kliknięciu zapisz tylko jedno pole
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("restaurant_id", initialData.id);
    formData.set(field, inputValue);

    // Dodaj pozostałe pola żeby nie skasować danych
    Object.entries(initialData).forEach(([k, v]) => {
      if (!formData.has(k) && k !== "id") formData.set(k, v || "");
    });

    const res = await addRestaurant({}, formData);
    setState(res);
    if (res.status === "success") onDone();
  };

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
      <button type="submit" className="text-blue-600 text-sm px-2">
        Zapisz
      </button>
      <button
        type="button"
        className="text-gray-500 text-sm px-2"
        onClick={onDone}
      >
        Anuluj
      </button>
      {state?.status === "error" && (
        <span className="text-red-600 ml-2 text-xs">{state.message}</span>
      )}
    </form>
  );
}
