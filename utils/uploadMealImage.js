"use client";

import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

export async function uploadMealImage(file) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("meal-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error || !data?.path) {
    console.error("Upload error:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("meal-images").getPublicUrl(data.path);

  return publicUrl;
}

export async function deleteMealImage(imageUrl) {
  const supabase = createClient();

  // Wyciągamy ścieżkę z publicznego URL-a
  const url = new URL(imageUrl);
  const path = decodeURIComponent(
    url.pathname.replace("/storage/v1/object/public/meal-images/", "")
  );

  const { error } = await supabase.storage.from("meal-images").remove([path]);

  if (error) {
    console.error("Delete image error:", error);
    return false;
  }

  return true;
}
