import { getMealsForRestaurant } from "@/actions/meals";
import { getRestaurantById } from "@/actions/restaurantServer";
import MealCard from "@/components/menu/MealCard";

export default async function RestaurantMenu({ params }) {
  const id = (await params).id;
  const restaurant = await getRestaurantById(id);
  const meals = await getMealsForRestaurant(id);

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
          />
        ))}
      </div>
    </div>
  );
}
