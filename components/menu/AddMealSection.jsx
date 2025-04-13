"use client";

import { useState } from "react";
import AddMealButton from "./AddMealButton";
import AddMealModal from "./AddMealModal";

export default function AddMealSection({ currencies, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  const handleClose = () => {
    setIsModalOpen(false);
    setFormKey(Date.now()); // wymusza reset modala
  };

  return (
    <>
      <AddMealButton onClick={() => setIsModalOpen(true)} />
      <AddMealModal
        key={formKey}
        isOpen={isModalOpen}
        onClose={handleClose}
        currencies={currencies}
        categories={categories}
      />
    </>
  );
}
