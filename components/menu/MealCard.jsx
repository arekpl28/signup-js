import Image from "next/image";
import glutenFreeIcon from "@/public/gluten3.png";
import chiliIcon from "@/public/chili2.png";

export default function MealCard({
  meal_number,
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
          <h3 className="text-lg text-black font-semibold">
            {meal_number ? `${meal_number}. ` : ""}
            {title}
          </h3>
        </div>
      </div>
      {image ? (
        <div className="aspect-square w-full overflow-hidden relative">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-full h-[140px] bg-gray-100 flex items-center justify-center text-gray-400">
          Brak zdjęcia
        </div>
      )}
      <div className="text-center font-bold text-black">{price}</div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm text-green-500 mb-1">
          <strong>Składniki:</strong> {ingredients}
        </p>
        <p className="line-clamp-2 text-sm text-red-500 mb-1">
          <strong>Alergeny:</strong> {allergens}
        </p>
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
      </div>
    </div>
  );
}
