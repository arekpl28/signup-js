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
