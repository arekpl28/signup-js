"use client";

import { useEffect, useState } from "react";
import { getCurrencies } from "@/actions/currencies";
import { getCategories } from "@/actions/categories";
import { submitMeal } from "@/actions/meals";
import { uploadMealImage } from "@/utils/uploadMealImage";

export function useAddMealForm(onClose) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "$",
    category: "",
    ingredients: "",
    image: null,
  });
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [curRes, catRes] = await Promise.all([
        getCurrencies(),
        getCategories(),
      ]);
      setCurrencies(curRes);
      setCategories(catRes);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = null;
    if (form.image) {
      try {
        imageUrl = await uploadMealImage(form.image);
      } catch (err) {
        console.error(err);
        alert("Błąd przy przesyłaniu zdjęcia");
        setIsSubmitting(false);
        return;
      }
    }

    await submitMeal({
      name: form.name,
      price_value: form.price,
      currency_code: form.currency,
      category_id: form.category,
      ingredients: selectedIngredients,
      allergens: selectedAllergens,
      image_url: imageUrl,
    });

    setIsSubmitting(false);
    onClose();
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    isAllergenModalOpen,
    setIsAllergenModalOpen,
    selectedAllergens,
    setSelectedAllergens,
    isIngredientModalOpen,
    setIsIngredientModalOpen,
    selectedIngredients,
    setSelectedIngredients,
    currencies,
    categories,
    isSubmitting,
  };
}
