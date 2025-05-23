"use client";

import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

export async function uploadMealImage(file) {
  const supabase = createClient();

  // 🔽 kompresja
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 0.3, // Maksymalnie 0.5 MB
    maxWidthOrHeight: 800, // Maksymalna szerokość/wysokość
    useWebWorker: true,
  });

  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("meal-images")
    .upload(fileName, compressedFile, {
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
