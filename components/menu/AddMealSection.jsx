"use client";

import { useState } from "react";
import AddMealButton from "./AddMealButton";
import AddMealModal from "./AddMealModal";

export default function AddMealSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AddMealButton onClick={() => setIsModalOpen(true)} />
      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
