"use client";

const categories = [
  "Wszystkie",
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

export default function CategoryTabs({ onSelect, selected }) {
  return (
    <div className="w-full flex flex-wrap gap-3 py-4 px-2">
      {categories.map((name) => {
        const isActive =
          selected === name || (name === "Wszystkie" && !selected);
        return (
          <div
            key={name}
            onClick={() => onSelect(name === "Wszystkie" ? null : name)}
            className={`px-4 py-2 text-sm whitespace-nowrap cursor-pointer rounded-full shadow border ${
              isActive
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
}
