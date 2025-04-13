"use client";

import { createClient } from "@/utils/supabase/client";

export async function getCategoriesClient() {
  const supabase = createClient();
  const { data, error } = await supabase.from("categories").select("*");
  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data;
}
