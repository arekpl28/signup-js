"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { getCurrencies } from "@/actions/currencies";

export default function AddMealModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "$",
    category: "",
    ingredients: "",
    allergens: "",
    image: null,
  });
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getCurrencies();
      setCurrencies(res);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit logic
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-xl p-6 w-[90%] max-w-lg text-black">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-xl font-bold">
              Dodaj posiłek
            </DialogTitle>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              name="name"
              placeholder="Nazwa"
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.name}
              required
            />
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Cena"
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.price}
              required
            />
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Wybierz walutę</option>
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.name} ({cur.symbol})
                </option>
              ))}
            </select>
            <select
              name="category"
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.category}
            >
              <option value="">-- Wybierz kategorię --</option>
              <option value="Zupy">Zupy</option>
              <option value="Dania główne">Dania główne</option>
              <option value="Desery">Desery</option>
              <option value="Napoje">Napoje</option>
            </select>
            <input
              name="ingredients"
              placeholder="Składniki (oddzielone przecinkami)"
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.ingredients}
            />
            <input
              name="allergens"
              placeholder="Alergeny (oddzielone przecinkami)"
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.allergens}
            />
            <input
              type="file"
              name="image"
              className="border p-2 rounded"
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded hover:opacity-90"
            >
              Zapisz
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
