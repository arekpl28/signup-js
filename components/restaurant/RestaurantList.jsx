import Link from "next/link";

export default function RestaurantList({ restaurants }) {
  if (!restaurants?.length) {
    return <p>Brak aktywnych restauracji.</p>;
  }

  return (
    <>
      {restaurants.map((r) => (
        <div key={r.id} className="mb-6 border-b pb-4">
          <Link href={`/pl/restaurants/${r.id}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
              {r.name}
            </h2>
          </Link>
          <p className="text-gray-600">{r.address}</p>
          <p>{r.description}</p>
        </div>
      ))}
    </>
  );
}
