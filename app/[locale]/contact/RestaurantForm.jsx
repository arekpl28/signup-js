"use client";
import { useState } from "react";
import { addRestaurant } from "@/actions/restaurantServer";

export default function RestaurantCreateForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.set("name", name);
    // tylko nazwa!
    const res = await addRestaurant({}, formData);
    setLoading(false);
    if (res.status === "success") {
      if (typeof onSuccess === "function") onSuccess();
    } else {
      setError(res.message || "Wystąpił błąd");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
      <input
        name="name"
        placeholder="Nazwa restauracji"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="bg-black text-white py-2 rounded hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Tworzenie..." : "Utwórz restaurację"}
      </button>
      {error && <p className="text-red-600 text-sm">❌ Błąd: {error}</p>}
    </form>
  );
}
