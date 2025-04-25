"use client";
import { useState } from "react";
import MealCard from "@/components/menu/MealCard";
import MealModal from "@/components/restaurant/MealModal"; // musisz utworzyć!

export default function RestaurantMenuClient({ restaurant, meals }) {
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Menu {restaurant?.name || "nieznanej restauracji"}
      </h1>

      {meals?.length === 0 && <p>Brak dostępnych posiłków.</p>}

      <div className="flex flex-wrap gap-4">
        {meals?.map((meal) => (
          <MealCard
            key={meal.id}
            title={meal.name}
            image={meal.image_url}
            price={`${meal.price_value ?? "?"} ${meal.currency_code ?? ""}`}
            ingredients={meal.ingredients?.map((i) => i.name).join(", ")}
            allergens={meal.allergens?.map((a) => a.name).join(", ")}
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
