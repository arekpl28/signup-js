import MenuList from "@/components/menu/MenuList";
import { getAllActiveRestaurants } from "@/actions/restaurantServer";
import RestaurantList from "@/components/restaurant/RestaurantList";

export default async function Home() {
  const restaurants = await getAllActiveRestaurants();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restauracje</h1>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}
