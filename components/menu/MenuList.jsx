"use client";

import { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import MealCard from "./MealCard";
import { useMeals } from "@/utils/useMeals";
import AddMealSection from "./AddMealSection";
import AddMealModal from "./AddMealModal";
import { useQueryClient } from "@tanstack/react-query";
import { useCategories } from "@/utils/useCategories";

export default function MenuListWrapper() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: meals = [], isLoading, error } = useMeals();
  const { data: categories = [] } = useCategories();

  const categoriesInMeals = [
    ...new Set(meals.map((meal) => meal.category_name).filter(Boolean)),
  ];

  const filteredMeals = selectedCategory
    ? meals.filter((meal) => meal.category_name === selectedCategory)
    : meals;

  return (
    <>
      <CategoryTabs
        categories={categoriesInMeals}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="w-full flex flex-wrap items-start justify-start gap-4 p-4">
        <AddMealSection categories={categories} />
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.meal_id}
            title={meal.meal_name}
            image={meal.image_url}
            price={`${meal.price_value} ${meal.currency_symbol || ""}`}
            ingredients={meal.ingredients?.map((i) => i.name).join(", ")}
            allergens={meal.allergens?.map((a) => a.name).join(", ")}
            glutenFree={meal.gluten_free}
            spiciness={meal.spiciness}
            onClick={() => {
              setSelectedMeal({
                meal_id: meal.meal_id,
                name: meal.meal_name,
                price: meal.price_value,
                category: meal.category_id,
                ingredients: meal.ingredients,
                allergens: meal.allergens,
                image_url: meal.image_url,
                gluten_free: meal.gluten_free,
                spiciness: meal.spiciness,
              });
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>
      <AddMealModal
        isOpen={isModalOpen}
        onClose={(updatedMeal) => {
          setIsModalOpen(false);
          setSelectedMeal(null);

          if (!updatedMeal) return;
          console.log("updatedMeal:", updatedMeal);
          queryClient.setQueryData(["meals"], (prevMeals = []) => {
            const index = prevMeals.findIndex(
              (m) => m.meal_id === updatedMeal.meal_id
            );
            const updated = {
              ...updatedMeal,
              ingredients: updatedMeal.ingredients?.map((i) => i.name) || [],
              allergens: updatedMeal.allergens?.map((a) => a.name) || [],
              category_name:
                categories.find((c) => c.id === updatedMeal.category)?.name ||
                "",
            };

            if (index !== -1) {
              const copy = [...prevMeals];
              copy[index] = { ...copy[index], ...updated };
              return copy;
            } else {
              return [...prevMeals, updated];
            }
          });
        }}
        meal={selectedMeal}
        categories={categories}
      />
    </>
  );
}
