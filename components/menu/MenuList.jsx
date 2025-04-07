"use client";

import { useState } from "react";
import CategoryTabs from "./CategoryTabs";
import AddMealButton from "./AddMealButton";
import AddMealModal from "./AddMealModal";

import pad_thai from "@/public/pad_thai.jpg";
import MealCard from "./MealCard";

export default function MenuList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CategoryTabs />
      <div className="w-full flex flex-wrap items-start justify-start gap-4 p-4">
        <AddMealButton onClick={() => setIsModalOpen(true)} />
        <MealCard
          title="Pad Thai"
          image={pad_thai}
          price="32 zł"
          ingredients="makaron ryżowy, krewetki, tofu, kiełki, orzeszki"
          allergens="orzeszki ziemne, soja"
        />
      </div>
      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
