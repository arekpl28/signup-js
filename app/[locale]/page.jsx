import MenuList from "@/components/menu/MenuList";
import { getAllActiveRestaurants } from "@/actions/restaurantServer";

export default async function Home() {
  const restaurants = await getAllActiveRestaurants();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restauracje</h1>
      {restaurants.length === 0 && <p>Brak aktywnych restauracji.</p>}
      {restaurants.map((r) => (
        <div key={r.id} className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold">{r.name}</h2>
          <p className="text-gray-600">{r.address}</p>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  );
}
