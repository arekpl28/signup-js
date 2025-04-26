import Link from "next/link";

export default function RestaurantList({ restaurants }) {
  if (!restaurants?.length) {
    return <p>Brak aktywnych restauracji.</p>;
  }
  console.log(restaurants);

  return (
    <>
      {restaurants.map((r) => (
        <div key={r.id} className="mb-6 border-b pb-4">
          <Link href={`/pl/restaurants/${r.id}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
              {r.name}
            </h2>
          </Link>
          {/* Ulica */}
          {r.street && <p className="text-gray-600">{r.street}</p>}
          {/* Kod pocztowy i miasto */}
          {(r.postal_code || r.city) && (
            <p className="text-gray-600">
              {[r.postal_code, r.city].filter(Boolean).join(" ")}
            </p>
          )}
          {/* Kraj */}
          {r.country && <p className="text-gray-600">{r.country}</p>}
          <p className="text-gray-600">{r.phone}</p>
          <p>{r.description}</p>
        </div>
      ))}
    </>
  );
}
