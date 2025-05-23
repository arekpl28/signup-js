"use client";
import { useState } from "react";
import MealCard from "@/components/menu/MealCard";
import MealModal from "@/components/restaurant/MealModal";
import CategoryTabs from "@/components/menu/CategoryTabs"; // Dodajesz import!
import { useTranslation } from "react-i18next";

export default function RestaurantMenuClient({ restaurant, meals }) {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoriesInMeals = [
    ...new Set(meals.map((meal) => meal.category_name).filter(Boolean)),
  ];
  const { t } = useTranslation();

  // Filtrowanie posiłków po kategorii
  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.category_name === selectedCategory)
    : meals;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Menu {restaurant?.name || "nieznanej restauracji"}
      </h1>

      {/* Kategorie */}
      <CategoryTabs
        categories={categoriesInMeals}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {filteredMeals.length === 0 && <p>{t("no_meals_available")}</p>}

      <div className="flex flex-wrap gap-4">
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.id}
            meal_number={meal.meal_number}
            title={meal.name}
            image={meal.image_url}
            price={`${meal.price_value ?? "?"} ${meal.currency_symbol || ""}`}
            ingredients={meal.ingredients?.map((i) => t(i.name)).join(", ")}
            allergens={meal.allergens?.map((a) => t(a.name)).join(", ")}
            glutenFree={meal.gluten_free}
            spiciness={meal.spiciness}
            onClick={() => setSelectedMeal(meal)}
          />
        ))}
      </div>

      {/* MODAL */}
      {selectedMeal && (
        <MealModal
          isOpen={!!selectedMeal}
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}
