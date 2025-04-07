"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";

export default function AddMealModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "",
    category: "",
    ingredients: "",
    allergens: "",
    image: null,
  });

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
        <DialogPanel className="bg-white rounded-xl p-6 w-[90%] max-w-lg">
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
            />
            <input
              name="price"
              placeholder="Cena"
              className="border p-2 rounded"
              onChange={handleChange}
            />
            <input
              name="currency"
              placeholder="Waluta"
              className="border p-2 rounded"
              onChange={handleChange}
            />
            <input
              name="category"
              placeholder="Kategoria"
              className="border p-2 rounded"
              onChange={handleChange}
            />
            <input
              name="ingredients"
              placeholder="Składniki (przecinki)"
              className="border p-2 rounded"
              onChange={handleChange}
            />
            <input
              name="allergens"
              placeholder="Alergeny (przecinki)"
              className="border p-2 rounded"
              onChange={handleChange}
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
