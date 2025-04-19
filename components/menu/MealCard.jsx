import Image from "next/image";
import glutenFreeIcon from "@/public/gluten3.png";

export default function MealCard({
  title,
  image,
  price,
  ingredients,
  allergens,
  glutenFree,
  onClick,
}) {
  return (
    <div
      className="w-60 h-auto border rounded-lg shadow bg-white overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mt-2 px-2">
        <div className="w-6 h-6" /> {/* Pusta przestrzeń – np. na przyszłość */}
        <div className="flex-1 text-center">
          <h3 className="text-lg text-black font-semibold">{title}</h3>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          {glutenFree && (
            <Image
              src={glutenFreeIcon} // podmień na swoją ścieżkę
              alt="Gluten free"
              width={30}
              height={30}
            />
          )}
        </div>
      </div>
      {image ? (
        <Image
          src={image}
          alt={title}
          width={240}
          height={140}
          className="w-full object-cover"
        />
      ) : (
        <div className="w-full h-[140px] bg-gray-100 flex items-center justify-center text-gray-400">
          Brak zdjęcia
        </div>
      )}
      <div className="text-center font-bold text-black">{price}</div>
      <div className="p-3">
        <div className="text-sm text-gray-500 mb-1">
          <strong>Składniki:</strong> {ingredients}
        </div>
        <div className="text-xs text-red-500 mb-2">
          <strong>Alergeny:</strong> {allergens}
        </div>
        {/* <div
          className={`text-xs font-medium ${
            glutenFree ? "text-green-600" : "text-gray-500"
          }`}
        >
          {glutenFree ? "Bez glutenu" : "Zawiera gluten"}
        </div> */}
      </div>
    </div>
  );
}
