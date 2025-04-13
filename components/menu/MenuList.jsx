"use client";

import { useEffect, useState } from "react";
import CategoryTabs from "./CategoryTabs";
import MealCard from "./MealCard";
import { getMealsWithDetails } from "@/actions/meals";
// import pad_thai from "@/public/pad_thai.jpg";
import AddMealSection from "./AddMealSection";
import AddMealModal from "./AddMealModal";

export default function MenuListWrapper() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getMealsWithDetails();
      setMeals(data);
    })();
  }, []);

  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.category_name === selectedCategory)
    : meals;

  return (
    <>
      <CategoryTabs
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="w-full flex flex-wrap items-start justify-start gap-4 p-4">
        <AddMealSection />
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.meal_id}
            title={meal.meal_name}
            image={meal.image_url} // TODO: replace with meal.image_url when real images are ready
            price={`${meal.price_value} ${meal.currency_symbol}`}
            ingredients={meal.ingredients?.map((i) => i.name).join(", ")}
            allergens={meal.allergens?.map((a) => a.name).join(", ")}
            onClick={() => {
              setSelectedMeal({
                meal_id: meal.meal_id,
                name: meal.meal_name,
                price: meal.price_value,
                currency: meal.currency_code,
                category: meal.category_id,
                ingredients: meal.ingredients?.length
                  ? meal.ingredients
                  : undefined,
                allergens: meal.allergens?.length ? meal.allergens : undefined,
                image_url: meal.image_url,
              });
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>
      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMeal(null);
        }}
        meal={selectedMeal}
      />
    </>
  );
}
