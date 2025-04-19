"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addRestaurant(prevState, formData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { status: "error", message: "Not authenticated" };

  const name = formData.get("name");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const opening_hours = formData.get("opening_hours");
  const description = formData.get("description");
  const restaurant_id = formData.get("restaurant_id");

  if (!name || name.trim() === "") {
    return { status: "error", message: "Nazwa restauracji jest wymagana." };
  }

  const payload = {
    owner_id: user.id,
    name,
    address,
    phone,
    opening_hours,
    description,
  };

  let error;

  if (restaurant_id) {
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
    .select("*")
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
    .select("id, name, address, description")
    .eq("is_active", true);

  if (error) {
    console.error("Błąd przy pobieraniu restauracji:", error.message);
    return [];
  }

  return data;
}
