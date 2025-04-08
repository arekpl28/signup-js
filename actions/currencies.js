"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCurrencies() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("currencies").select("*");
  if (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
  return data;
}
