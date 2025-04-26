"use client";

import { addRestaurant } from "@/actions/restaurantServer"; // zmień, jeśli masz inną nazwę
import { useActionState, useEffect } from "react";
import { useCurrencies } from "@/utils/useCurrencies";

export default function RestaurantForm({ initialData = {}, onSuccess }) {
  const [state, formAction] = useActionState(addRestaurant, {});
  const { data: currencies = [] } = useCurrencies();

  useEffect(() => {
    if (state?.status === "success" && typeof onSuccess === "function") {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="flex flex-col gap-4 text-black">
      {initialData.id && (
        <input type="hidden" name="restaurant_id" value={initialData.id} />
      )}

      <input
        name="name"
        placeholder="Nazwa restauracji"
        required
        defaultValue={initialData.name || ""}
        className="w-full px-3 py-2 border rounded"
      />
      <select
        name="currency_code"
        defaultValue={
          currencies.some((c) => c.code === initialData.currency_code)
            ? initialData.currency_code
            : ""
        }
        required
        className="w-full px-3 py-2 border rounded"
      >
        <option value="">Wybierz walutę</option>
        {currencies.map((cur) => (
          <option key={cur.code} value={cur.code}>
            {cur.name} ({cur.symbol})
          </option>
        ))}
      </select>
      <input
        name="address"
        placeholder="Adres"
        defaultValue={initialData.address || ""}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="phone"
        placeholder="Telefon"
        defaultValue={initialData.phone || ""}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="opening_hours"
        placeholder="Godziny otwarcia"
        defaultValue={initialData.opening_hours || ""}
        className="w-full px-3 py-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Opis"
        defaultValue={initialData.description || ""}
        className="w-full px-3 py-2 border rounded"
      />

      <button
        type="submit"
        className="bg-black text-white py-2 rounded hover:opacity-90"
      >
        {initialData.id ? "Zaktualizuj" : "Zapisz"}
      </button>

      {state?.status === "success" && (
        <p className="text-green-600 text-sm">✅ Zapisano!</p>
      )}
      {state?.status === "error" && (
        <p className="text-red-600 text-sm">❌ Błąd: {state.message}</p>
      )}
    </form>
  );
}
