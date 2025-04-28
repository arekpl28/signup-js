import { getMealsForRestaurant } from "@/actions/meals";
import { getRestaurantById } from "@/actions/restaurantServer";
import RestaurantMenuClient from "@/components/restaurant/RestaurantMenuClient";

export default async function RestaurantMenu({ params }) {
  try {
    const id = (await params).id;
    const restaurant = await getRestaurantById(id);
    const meals = await getMealsForRestaurant(id);

    // Handling case when no restaurant is found
    if (!restaurant) {
      return <p>Restaurant not found.</p>;
    }

    // Handling case when no meals are found
    if (!meals) {
      return <p>No meals available for this restaurant.</p>;
    }

    return <RestaurantMenuClient restaurant={restaurant} meals={meals} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <p>There was an error loading the restaurant details.</p>;
  }
}
