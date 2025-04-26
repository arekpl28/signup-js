"use client";

import { addRestaurant } from "@/actions/restaurantServer";
import { useActionState, useEffect, useState } from "react";
import { useCurrencies } from "@/utils/useCurrencies";

export default function RestaurantForm({ initialData = {}, onSuccess }) {
  const [state, formAction] = useActionState(addRestaurant, {});
  const { data: currencies = [] } = useCurrencies();

  // Controlled form state
  const [form, setForm] = useState({
    name: initialData.name || "",
    currency_code: initialData.currency_code || "",
    street: initialData.street || "",
    postal_code: initialData.postal_code || "",
    city: initialData.city || "",
    country: initialData.country || "",
    phone: initialData.phone || "",
    opening_hours: initialData.opening_hours || "",
    description: initialData.description || "",
    restaurant_id: initialData.id || "",
  });

  useEffect(() => {
    if (state?.status === "success" && typeof onSuccess === "function") {
      onSuccess();
    }
  }, [state, onSuccess]);

  // Obsługa zmiany w polach formularza
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action={formAction} className="flex flex-col gap-4 text-black">
      {form.restaurant_id && (
        <input type="hidden" name="restaurant_id" value={form.restaurant_id} />
      )}

      <input
        name="name"
        placeholder="Nazwa restauracji"
        required
        value={form.name}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />

      <select
        name="currency_code"
        value={form.currency_code}
        onChange={handleChange}
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
        name="street"
        placeholder="Ulica i numer"
        value={form.street}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <div className="flex gap-2">
        <input
          name="postal_code"
          placeholder="Kod pocztowy"
          value={form.postal_code}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded"
        />
        <input
          name="city"
          placeholder="Miasto"
          value={form.city}
          onChange={handleChange}
          className="flex-1 px-3 py-2 border rounded"
        />
      </div>
      <input
        name="country"
        placeholder="Kraj"
        value={form.country}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="phone"
        placeholder="Telefon"
        value={form.phone}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="opening_hours"
        placeholder="Godziny otwarcia"
        value={form.opening_hours}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Opis"
        value={form.description}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />

      <button
        type="submit"
        className="bg-black text-white py-2 rounded hover:opacity-90"
      >
        {form.restaurant_id ? "Zaktualizuj" : "Zapisz"}
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
