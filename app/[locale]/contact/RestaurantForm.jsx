"use client";

import { useState } from "react";
import { addRestaurant } from "@/actions/restaurantServer";
import { useCurrencies } from "@/utils/useCurrencies";
import { uploadRestaurantImage } from "@/utils/uploadRestaurantImage";

export default function RestaurantForm({ initialData = {}, onSuccess }) {
  const { data: currencies = [] } = useCurrencies();

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
    image: null,
    image_url: initialData.image_url || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Obsługa zmiany pól formularza
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length) {
      setForm((prev) => ({
        ...prev,
        image: files[0],
        image_url: URL.createObjectURL(files[0]), // podgląd lokalny
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    let imageUrl = form.image_url;

    if (form.image) {
      imageUrl = await uploadRestaurantImage(form.image);
      if (!imageUrl) {
        setError("Błąd przy przesyłaniu zdjęcia!");
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k !== "image") formData.set(k, v ?? "");
    });
    formData.set("image_url", imageUrl);

    const res = await addRestaurant({}, formData);

    setLoading(false);

    if (res.status === "success") {
      setSuccess(true);
      if (typeof onSuccess === "function") onSuccess();
    } else {
      setError(res.message || "Wystąpił błąd");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
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

      {/* --- POLE ZDJĘCIA + PODGLĄD --- */}
      <div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {form.image_url && (
          <img
            src={form.image_url}
            alt="Podgląd zdjęcia"
            className="mt-2 max-h-32 rounded"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white py-2 rounded hover:opacity-90"
        disabled={loading}
      >
        {form.restaurant_id ? "Zaktualizuj" : "Zapisz"}
      </button>

      {success && <p className="text-green-600 text-sm">✅ Zapisano!</p>}
      {error && <p className="text-red-600 text-sm">❌ Błąd: {error}</p>}
    </form>
  );
}
