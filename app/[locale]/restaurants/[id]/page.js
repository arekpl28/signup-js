import { createClient } from "@/utils/supabase/server";
import MealCard from "@/components/menu/MealCard";

export default async function RestaurantMenu(props) {
  const supabase = await createClient();
  const { id } = await getParams(props);

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("name")
    .eq("id", id)
    .single();

  const { data: meals, error } = await supabase
    .from("meals")
    .select(
      "id, name, image_url, price_value, currency_code, gluten_free, spiciness"
    )
    .eq("restaurant_id", id)
    .eq("is_active", true);

  console.log("restaurant_id:", id);
  console.log("meals:", meals);
  if (error) console.error("Supabase error:", error.message);

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
            ingredients={meal.ingredients?.map((i) => i.name).join(", ") ?? ""}
            allergens={meal.allergens?.map((a) => a.name).join(", ") ?? ""}
            glutenFree={meal.gluten_free}
            spiciness={meal.spiciness}
          />
        ))}
      </div>
    </div>
  );
}

async function getParams(props) {
  return props.params;
}
