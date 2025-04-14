"use server";

import { createClient } from "@/utils/supabase/server";

export async function deleteMealImageServer(imageUrl) {
  const supabase = await createClient();

  try {
    const path = imageUrl.split("/meal-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage.from("meal-images").remove([path]);

    if (error) {
      console.error("Błąd przy usuwaniu zdjęcia:", error);
    }
  } catch (err) {
    console.error("deleteMealImageServer error:", err);
  }
}
