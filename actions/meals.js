"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMealsWithDetails() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_meals_with_details");

  if (error) {
    console.error("Error fetching meals:", error.message);
    return [];
  }

  return data;
}

export async function submitMeal(form) {
  const supabase = await createClient();

  const {
    name,
    price_value,
    currency_code,
    category_id,
    meal_id,
    allergens = [],
    ingredients = [],
  } = form;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not authenticated" };

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id")
    .eq("owner_id", user.id)
    .single();
  if (!restaurant) return { status: "error", message: "Restaurant not found" };

  if (!name || name.trim() === "") {
    return { status: "error", message: "Nazwa dania jest wymagana." };
  }

  const payload = {
    name,
    price_value,
    currency_code,
    category_id,
    restaurant_id: restaurant.id,
  };

  let meal;
  let error;

  if (meal_id) {
    ({ error } = await supabase
      .from("meals")
      .update(payload)
      .eq("id", meal_id));
    meal = { id: meal_id };
  } else {
    const result = await supabase
      .from("meals")
      .insert(payload)
      .select()
      .single();
    meal = result.data;
    error = result.error;
  }

  if (!meal || error) {
    return {
      status: "error",
      message: error?.message || "Błąd podczas zapisu posiłku",
    };
  }

  if (allergens.length) {
    await supabase.from("meal_allergens").delete().eq("meal_id", meal.id);
    await supabase.from("meal_allergens").insert(
      allergens.map((a) => ({
        meal_id: meal.id,
        allergen_id: typeof a === "string" ? a : a.id,
      }))
    );
  }

  if (ingredients.length) {
    await supabase.from("meal_ingredients").delete().eq("meal_id", meal.id);
    await supabase.from("meal_ingredients").insert(
      ingredients.map((i) => ({
        meal_id: meal.id,
        ingredient_id: typeof i === "string" ? i : i.id,
      }))
    );
  }

  revalidatePath("/");
  return { status: "success" };
}
