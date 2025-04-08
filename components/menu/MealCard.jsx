import Image from "next/image";

export default function MealCard({
  title,
  image,
  price,
  ingredients,
  allergens,
}) {
  return (
    <div className="w-60 h-auto border rounded-lg shadow bg-white overflow-hidden">
      <h3 className="text-lg text-center text-black font-semibold">{title}</h3>
      <Image
        src={image}
        alt={title}
        width={240}
        height={140}
        className="w-full object-cover"
      />
      <div className="text-center font-bold text-black">{price}</div>
      <div className="p-3">
        <div className="text-sm text-gray-500 mb-1">
          <strong>Składniki:</strong> {ingredients}
        </div>
        <div className="text-xs text-red-500 mb-2">
          <strong>Alergeny:</strong> {allergens}
        </div>
      </div>
    </div>
  );
}
