"use client";

import { useEffect, useState } from "react";
import { getCurrencies } from "@/actions/currencies";
import { getCategories } from "@/actions/categories";
import { submitMeal } from "@/actions/meals";
import { uploadMealImage } from "@/utils/uploadMealImage";
import { useQueryClient } from "@tanstack/react-query";

export function useAddMealForm(
  onClose,
  initialMeal = null,
  passedCurrencies = [],
  passedCategories = []
) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "$",
    category: "",
    ingredients: "",
    image: null,
    meal_id: "",
  });
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCurrencies(passedCurrencies);
    setCategories(passedCategories);
  }, [passedCurrencies, passedCategories]);

  useEffect(() => {
    if (initialMeal) {
      const validIngredients = (initialMeal.ingredients || []).filter(
        (i) => i?.id && i?.name
      );
      const validAllergens = (initialMeal.allergens || []).filter(
        (a) => a?.id && a?.name
      );

      setForm({
        name: initialMeal.name || "",
        price: initialMeal.price || "",
        currency: initialMeal.currency || "",
        category: initialMeal.category || "",
        ingredients: validIngredients,
        allergens: validAllergens,
        image: initialMeal.image_url || null,
        meal_id: initialMeal.meal_id || "",
      });

      setSelectedAllergens(validAllergens);
      setSelectedIngredients(validIngredients);
    }
  }, [initialMeal]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, ingredients: selectedIngredients }));
  }, [selectedIngredients]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, allergens: selectedAllergens }));
  }, [selectedAllergens]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = null;
    if (form.image instanceof File) {
      try {
        imageUrl = await uploadMealImage(form.image);
      } catch (err) {
        console.error(err);
        alert("Błąd przy przesyłaniu zdjęcia");
        setIsSubmitting(false);
        return;
      }
    } else if (typeof form.image === "string") {
      imageUrl = form.image;
    }

    const result = await submitMeal({
      meal_id: form.meal_id,
      name: form.name,
      price_value: form.price,
      currency_code: form.currency,
      category_id: form.category,
      ingredients: selectedIngredients,
      allergens: selectedAllergens,
      image_url: imageUrl,
    });

    queryClient.invalidateQueries({ queryKey: ["meals"] });

    setIsSubmitting(false);

    if (result.status === "success") {
      onClose(result.meal); // ← to pełny posiłek, już z meal_id, kategorią itd.
    } else {
      alert(result.message || "Wystąpił błąd przy zapisie");
    }
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
