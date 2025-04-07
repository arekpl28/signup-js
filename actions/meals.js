"use server";

import { createClient } from "@/utils/supabase/server";

export async function getMealsWithDetails() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_meals_with_details");

  if (error) {
    console.error("Error fetching meals:", error.message);
    return [];
  }

  return data;
}
