"use client";

const categories = [
  "Przystawki",
  "Zupy",
  "Sałatki",
  "Dania główne",
  "Pizze",
  "Desery",
  "Napoje zimne",
  "Napoje gorące",
  "Alkohole",
  "Dodatki",
];

export default function CategoryTabs() {
  return (
    <div className="w-full flex flex-wrap gap-3 py-4 px-2">
      {categories.map((name) => (
        <div
          key={name}
          className="px-4 py-2 text-black bg-white border rounded-full shadow text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100"
        >
          {name}
        </div>
      ))}
    </div>
  );
}
