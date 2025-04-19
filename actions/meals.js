"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { deleteMealImageServer } from "@/utils/deleteMealImageServer";

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
    image_url,
    gluten_free,
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
    image_url,
    gluten_free,
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

  // Always delete old allergens
  await supabase.from("meal_allergens").delete().eq("meal_id", meal.id);
  if (allergens.length > 0) {
    await supabase.from("meal_allergens").insert(
      allergens.map((a) => ({
        meal_id: meal.id,
        allergen_id: typeof a === "string" ? a : a.id,
      }))
    );
  }

  // Always delete old ingredients
  await supabase.from("meal_ingredients").delete().eq("meal_id", meal.id);
  if (ingredients.length > 0) {
    await supabase.from("meal_ingredients").insert(
      ingredients.map((i) => ({
        meal_id: meal.id,
        ingredient_id: typeof i === "string" ? i : i.id,
      }))
    );
  }

  revalidatePath("/");
  const { data: fullMeal } = await supabase
    .rpc("get_meals_with_details_by_id", { meal_id: meal.id }) // zakładamy że masz taką funkcję RPC
    .single();

  return {
    status: "success",
    meal: fullMeal,
  };
}

export async function deleteMeal(meal_id, image_url = null) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not authenticated" };

  // 🔽 usuń obrazek jeśli jest
  if (image_url && typeof image_url === "string") {
    await deleteMealImageServer(image_url);
  }

  const { error } = await supabase.from("meals").delete().eq("id", meal_id);

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/");
  return { status: "success" };
}
