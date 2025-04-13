"use client";

import { useEffect } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useAddMealForm } from "./useAddMealForm";
import AllergenSelectorModal from "./AllergenSelectorModal";
import IngredientSelectorModal from "./IngredientSelectorModal";

export default function AddMealModal({ isOpen, onClose, meal }) {
  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    selectedAllergens,
    setSelectedAllergens,
    selectedIngredients,
    setSelectedIngredients,
    currencies,
    categories,
    isAllergenModalOpen,
    setIsAllergenModalOpen,
    isIngredientModalOpen,
    setIsIngredientModalOpen,
    isSubmitting, // <-- add this line
  } = useAddMealForm(onClose, meal);

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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                Wybierz składniki
              </button>
              <div className="text-sm text-gray-700">
                {selectedIngredients.length > 0 ? (
                  <ul className="list-disc list-inside text-black">
                    {selectedIngredients.filter(Boolean).map((ingredient) => (
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
                disabled={isSubmitting}
              >
                Wybierz alergeny
              </button>
              <div className="text-sm text-gray-700">
                {selectedAllergens.length > 0 ? (
                  <ul className="list-disc list-inside text-black">
                    {selectedAllergens.filter(Boolean).map((allergen) => (
                      <li key={allergen.id}>{allergen.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>Brak wybranych alergenów.</span>
                )}
              </div>
            </div>
            {typeof form.image === "string" && (
              <div className="mb-2">
                <img
                  src={form.image}
                  alt="Podgląd zdjęcia"
                  className="max-h-40 rounded border"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple={false}
              className="border p-2 rounded"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setForm((prev) => ({ ...prev, image: file }));
                }
              }}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Zapisywanie..." : "Zapisz"}
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
          <pre className="text-sm text-gray-600">
            {JSON.stringify(form, null, 2)}
          </pre>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
