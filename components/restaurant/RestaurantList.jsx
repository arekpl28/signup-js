import Link from "next/link";

export default function RestaurantList({ restaurants }) {
  if (!restaurants?.length) {
    return <p>Brak aktywnych restauracji.</p>;
  }
  // console.log(restaurants);

  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}`); // Usunięcie "Z", by nie używać UTC
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Formatowanie czasu
  };

  const weekdays = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

  return (
    <>
      {restaurants.map((r) => (
        <div
          key={r.id}
          className="mb-6 border-b pb-4 flex items-center space-x-4"
        >
          {/* Zdjęcie restauracji po lewej */}
          {r.image_url && (
            <div className="w-44 h-44 overflow-hidden">
              <img
                src={r.image_url}
                alt={r.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Dane restauracji po środku */}
          <div className="flex-1">
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

          {/* Godziny otwarcia po prawej */}
          <div className="text-gray-600 flex flex-col space-y-2">
            {r.opening_hours?.length > 0 ? (
              r.opening_hours.map((hour, index) => (
                <div key={index} className="flex justify-between w-full">
                  <span className="min-w-[100px] text-left">
                    {weekdays[index]}
                  </span>
                  <span className="flex-grow text-right">
                    {formatTime(hour.open_time)} - {formatTime(hour.close_time)}
                  </span>
                </div>
              ))
            ) : (
              <p>Brak godzin otwarcia</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
