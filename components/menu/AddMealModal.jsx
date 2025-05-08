"use client";

import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useAddMealForm } from "./useAddMealForm";
import AllergenSelectorModal from "./AllergenSelectorModal";
import IngredientSelectorModal from "./IngredientSelectorModal";
import { useTranslation } from "react-i18next";

export default function AddMealModal({ isOpen, onClose, meal, categories }) {
  const {
    form,
    setForm,
    handleChange,
    handleSubmit,
    handleDelete,
    selectedAllergens,
    setSelectedAllergens,
    selectedIngredients,
    setSelectedIngredients,
    isAllergenModalOpen,
    setIsAllergenModalOpen,
    isIngredientModalOpen,
    setIsIngredientModalOpen,
    isSubmitting, // <-- add this line
  } = useAddMealForm(onClose, meal, categories);
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-xl p-6 w-[90%] max-w-lg text-black">
          <div className="flex justify-between items-center mb-4">
            <DialogTitle className="text-xl font-bold">
              {t("add_meal")}
            </DialogTitle>
            <button onClick={() => onClose(null)}>
              <X />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              name="meal_number"
              type="number"
              placeholder={t("meal_number")}
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.meal_number || ""}
              min={1}
              disabled={isSubmitting}
              required // jeśli zawsze wymagane
            />
            <input
              name="name"
              placeholder={t("meal_name")}
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
              placeholder={t("meal_price")}
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.price}
              required
              disabled={isSubmitting}
            />

            <select
              name="category"
              className="border p-2 rounded"
              onChange={handleChange}
              value={form.category}
              disabled={isSubmitting}
            >
              <option value="">{t("select_category_placeholder")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {t(cat.name)}
                  {/* {cat.name} */}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <label htmlFor="gluten_free" className="text-sm text-black">
                {t("gluten_free")}
                {"  "}
                <input
                  type="checkbox"
                  id="gluten_free"
                  name="gluten_free"
                  checked={form.gluten_free}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      gluten_free: e.target.checked,
                    }))
                  }
                  disabled={isSubmitting}
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="spiciness" className="text-sm text-black">
                {t("meal_spiciness")}
              </label>
              <select
                id="spiciness"
                name="spiciness"
                value={form.spiciness}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    spiciness: parseInt(e.target.value),
                  }))
                }
                disabled={isSubmitting}
                className="border p-2 rounded"
              >
                <option value={0}>{t("spiciness_none")}</option>
                <option value={1}>{t("spiciness_mild")} 🌶️</option>
                <option value={2}>{t("spiciness_hot")} 🌶️🌶️</option>
                <option value={3}>{t("spiciness_very_hot")} 🌶️🌶️🌶️</option>
              </select>
            </div>
            <div>
              <button
                type="button"
                className="bg-gray-200 text-black px-4 py-2 rounded mb-2"
                onClick={() => setIsIngredientModalOpen(true)}
                disabled={isSubmitting}
              >
                {t("select_ingredients")}
              </button>
              <div className="text-sm text-gray-700">
                {selectedIngredients.length > 0 ? (
                  <span>
                    {selectedIngredients
                      .filter(Boolean)
                      .map((ingredient) => ingredient.name)
                      .join(", ")}
                  </span>
                ) : (
                  <span>{t("no_ingredients_selected")}</span>
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
                {t("select_allergens")}
              </button>
              <div className="text-sm text-gray-700 ">
                {selectedAllergens.length > 0 ? (
                  <span>
                    {selectedAllergens
                      .filter(Boolean)
                      .map((allergen) => allergen.name)
                      .join(", ")}
                  </span>
                ) : (
                  <span>{t("no_allergens_selected")}</span>
                )}
              </div>
            </div>
            {typeof form.image === "string" && (
              <div className="mb-2">
                <img
                  src={form.image}
                  alt={t("image_preview")}
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
            <div className="flex gap-2">
              {meal && (
                <button
                  type="button"
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  {t("delete")}
                </button>
              )}
              <button
                type="submit"
                className={`${
                  meal ? "flex-1" : "w-full"
                } bg-black text-white py-2 rounded hover:opacity-90 disabled:opacity-50`}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("saving") : t("save")}
              </button>
            </div>
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
          {/* <pre className="text-sm text-gray-600">
            {JSON.stringify(form, null, 2)}
          </pre> */}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
