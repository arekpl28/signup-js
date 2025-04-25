import { getMealsForRestaurant } from "@/actions/meals";
import { getRestaurantById } from "@/actions/restaurantServer";
import RestaurantMenuClient from "@/components/restaurant/RestaurantMenuClient";

export default async function RestaurantMenu({ params }) {
  const id = (await params).id;
  const restaurant = await getRestaurantById(id);
  const meals = await getMealsForRestaurant(id);

  return <RestaurantMenuClient restaurant={restaurant} meals={meals} />;
}
