"use client";

import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MealModal({ isOpen, onClose, meal }) {
  if (!meal) return null;
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-xl p-6 w-[90%] max-w-lg text-black relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            aria-label="Zamknij"
          >
            <X />
          </button>
          {/* NAZWA */}
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            {meal.meal_number ? `${meal.meal_number}. ` : ""}
            {meal.name}
          </DialogTitle>
          {/* OBRAZEK */}
          {meal.image_url && (
            <img
              src={meal.image_url}
              alt={meal.name}
              className="aspect-square w-full rounded-lg object-cover mb-4"
            />
          )}
          {/* CENA */}
          <div className="mb-4 text-xl font-semibold text-center">
            {meal.price_value}
          </div>
          {/* KATEGORIA */}
          <div className="mb-2">
            <b>{t("category")}</b> {t(meal.category_name)}
          </div>
          {/* SKŁADNIKI */}
          <div className="mb-2">
            <b>{t("ingredients")}</b>{" "}
            {Array.isArray(meal.ingredients) && meal.ingredients.length > 0
              ? meal.ingredients.map((i) => t(i.name)).join(", ")
              : "Brak"}
          </div>
          {/* ALERGENY */}
          <div className="mb-2">
            <b>{t("allergens")}</b>{" "}
            {Array.isArray(meal.allergens) && meal.allergens.length > 0
              ? meal.allergens.map((a) => t(a.name)).join(", ")
              : "Brak"}
          </div>
          {/* BEZGLUTENOWY */}
          <div className="mb-2">
            <b>{t("gluten_free") + ":"}</b>{" "}
            {meal.gluten_free ? t("yes") : t("no")}
          </div>
          {/* OSTROŚĆ */}
          <div className="mb-2">
            <b>{t("meal_spiciness")}</b>{" "}
            {meal.spiciness > 0 ? "🌶️".repeat(meal.spiciness) : "Brak"}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
