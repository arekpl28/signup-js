import Image from "next/image";
import glutenFreeIcon from "@/public/gluten3.png";
import chiliIcon from "@/public/chili2.png";

export default function MealCard({
  title,
  image,
  price,
  ingredients,
  allergens,
  glutenFree,
  spiciness,
  onClick,
}) {
  return (
    <div
      className="w-60 h-auto border rounded-lg shadow bg-white overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mt-1 ">
        <div className="flex-1 text-center">
          <h3 className="text-lg text-black font-semibold">{title}</h3>
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
        <div className="flex -ml-2 items-center justify-between">
          <div className="flex items-center ">
            {Array.from({ length: spiciness || 0 }).map((_, i) => (
              <Image
                key={i}
                src={chiliIcon}
                alt="Spicy"
                width={24}
                height={24}
                className={i > 0 ? "-ml-3" : ""}
              />
            ))}
          </div>

          {glutenFree && (
            <Image
              src={glutenFreeIcon}
              alt="Gluten free"
              width={24}
              height={24}
            />
          )}
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
