"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveRestaurantHour(restaurant_id, weekday, value) {
  const supabase = await createClient();
  // Najpierw usuń stare godziny dla tego dnia
  await supabase
    .from("restaurant_hours")
    .delete()
    .eq("restaurant_id", restaurant_id)
    .eq("weekday", weekday);

  // Dodaj tylko jeśli nie zamknięte
  if (value && value.open_time && value.close_time) {
    await supabase.from("restaurant_hours").insert({
      restaurant_id,
      weekday,
      open_time: value.open_time,
      close_time: value.close_time,
    });
  }
}

export async function addRestaurant(prevState, formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "Not authenticated" };

  const restaurant_id = formData.get("restaurant_id");

  // --- ZBIERAJ WSZYSTKIE POLA! ---
  // To czytaj z formData, a jak nie ma to zostaw undefined
  const name = formData.get("name");
  const street = formData.get("street");
  const postal_code = formData.get("postal_code");
  const city = formData.get("city");
  const country = formData.get("country");
  const phone = formData.get("phone");
  const description = formData.get("description");
  const currency_code = formData.get("currency_code");
  const image_url = formData.get("image_url");

  // Zbierz stare dane z bazy jeśli edycja
  let currentData = {};
  if (restaurant_id) {
    const { data } = await supabase
      .from("restaurants")
      .select("*")
      .eq("id", restaurant_id)
      .single();
    currentData = data || {};
  }

  // Twórz payload nadpisując tylko pole z formData, reszta ze starych danych!
  const payload = {
    owner_id: user.id,
    name: name ?? currentData.name,
    street: street ?? currentData.street,
    postal_code: postal_code ?? currentData.postal_code,
    city: city ?? currentData.city,
    country: country ?? currentData.country,
    phone: phone ?? currentData.phone,
    description: description ?? currentData.description,
    ...(currency_code ? { currency_code } : {}),
    image_url: image_url ?? currentData.image_url,
  };

  let error;
  if (restaurant_id) {
    // Obsłuż usuwanie starego zdjęcia jeśli zmienione
    if (
      currentData.image_url &&
      image_url &&
      currentData.image_url !== image_url
    ) {
      await deleteRestaurantImageServer(currentData.image_url);
    }
    ({ error } = await supabase
      .from("restaurants")
      .update(payload)
      .eq("id", restaurant_id));
  } else {
    ({ error } = await supabase.from("restaurants").insert(payload));
  }

  if (error) {
    return { status: "error", message: error.message };
  }

  revalidatePath("/restaurant");
  return { status: "success" };
}

export async function getRestaurantForCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("restaurants")
    .select(
      `
      id, name, street, postal_code, city, country, phone, description, currency_code, image_url,
      opening_hours:restaurant_hours (
        weekday, open_time, close_time
      )
    `
    )
    .eq("owner_id", user.id)
    .single();
  if (error) {
    return null;
  }

  return data;
}

export async function getAllActiveRestaurants() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("restaurants")
    .select(
      `
      id,image_url, name, street, postal_code, city, country, phone, description,
      opening_hours:restaurant_hours (
        weekday, open_time, close_time
      )
    `
    )
    .eq("is_active", true);

  if (error) {
    console.error("Błąd przy pobieraniu restauracji:", error.message);
    return [];
  }

  return data;
}

export async function getRestaurantById(id) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("restaurants")
    .select(
      `
    id, name, street, city, country, phone, description, currency_code, image_url,
    opening_hours:restaurant_hours (
      weekday, open_time, close_time
    )
  `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Błąd przy pobieraniu restauracji:", error.message);
    return null;
  }

  return data;
}

export async function deleteRestaurantImageServer(imageUrl) {
  const supabase = await createClient();

  try {
    const path = imageUrl.split("/restaurant-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("restaurant-images")
      .remove([path]);

    if (error) {
      console.error("Błąd przy usuwaniu zdjęcia restauracji:", error);
    }
  } catch (err) {
    console.error("deleteRestaurantImageServer error:", err);
  }
}
