"use client";

import { createClient } from "@/utils/supabase/client";

export async function getCurrenciesClient() {
  const supabase = createClient();
  const { data, error } = await supabase.from("currencies").select("*");

  if (error) {
    console.error("Błąd przy pobieraniu walut:", error);
    return [];
  }

  return data;
}
