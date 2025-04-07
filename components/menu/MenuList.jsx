import CategoryTabs from "./CategoryTabs";
import MealCard from "./MealCard";
import { getMealsWithDetails } from "@/actions/meals";
import pad_thai from "@/public/pad_thai.jpg";
import AddMealSection from "./AddMealSection";

export default async function MenuList() {
  const meals = await getMealsWithDetails();
  return (
    <>
      <CategoryTabs />
      <div className="w-full flex flex-wrap items-start justify-start gap-4 p-4">
        <AddMealSection />
        {meals.map((meal) => (
          <MealCard
            key={meal.meal_id}
            title={meal.meal_name}
            image={pad_thai} // TODO: replace with meal.image_url when real images are ready
            price={`${meal.price_value} ${meal.currency_symbol}`}
            ingredients={meal.ingredients?.join(", ")}
            allergens={meal.allergens?.join(", ")}
          />
        ))}
      </div>
    </>
  );
}
