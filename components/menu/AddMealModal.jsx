"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { getCurrencies } from "@/actions/currencies";
import { getCategories } from "@/actions/categories";
import { submitMeal } from "@/actions/meals";
import AllergenSelectorModal from "./AllergenSelectorModal";
import IngredientSelectorModal from "./IngredientSelectorModal";

export default function AddMealModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "$",
    category: "",
    ingredients: "",
    image: null,
  });
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [curRes, catRes] = await Promise.all([
        getCurrencies(),
        getCategories(),
      ]);
      setCurrencies(curRes);
      setCategories(catRes);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitMeal({
      name: form.name,
      price_value: form.price,
      currency_code: form.currency,
      category_id: form.category,
      ingredients: selectedIngredients,
      allergens: selectedAllergens,
    });

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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div>
              <button
                type="button"
                className="bg-gray-200 text-black px-4 py-2 rounded mb-2"
                onClick={() => setIsIngredientModalOpen(true)}
              >
                Wybierz składniki
              </button>
              <div className="text-sm text-gray-700">
                {selectedIngredients.length > 0 ? (
                  <ul className="list-disc list-inside text-black">
                    {selectedIngredients.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>Brak wybranych składników.</span>
                )}
              </div>
            </div>
            <div>
              <button
                type="button"
                className="bg-gray-200 text-black px-4 py-2 rounded mb-2"
                onClick={() => setIsAllergenModalOpen(true)}
              >
                Wybierz alergeny
              </button>
              <div className="text-sm text-gray-700">
                {selectedAllergens.length > 0 ? (
                  <ul className="list-disc list-inside text-black">
                    {selectedAllergens.map((allergen) => (
                      <li key={allergen.id}>{allergen.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>Brak wybranych alergenów.</span>
                )}
              </div>
            </div>
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
          <AllergenSelectorModal
            isOpen={isAllergenModalOpen}
            onClose={() => setIsAllergenModalOpen(false)}
            selected={selectedAllergens}
            onSave={setSelectedAllergens}
          />
          <IngredientSelectorModal
            isOpen={isIngredientModalOpen}
            onClose={() => setIsIngredientModalOpen(false)}
            selected={selectedIngredients}
            onSave={setSelectedIngredients}
          />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
