"use client";

import { createClient } from "@/utils/supabase/client";

export async function deleteRestaurantImage(imageUrl) {
  const supabase = await createClient();

  try {
    const path = imageUrl.split("/restaurant-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("restaurant-images")
      .remove([path]);

    if (error) {
      console.error("Błąd przy usuwaniu zdjęcia:", error);
    }
  } catch (err) {
    console.error("deleteMealImageServer error:", err);
  }
}
