"use client";

import { useEffect, useState } from "react";
import { submitMeal } from "@/actions/meals";
import { uploadMealImage } from "@/utils/uploadMealImage";
import { useQueryClient } from "@tanstack/react-query";
import { deleteMeal } from "@/actions/meals";

export function useAddMealForm(
  onClose,
  initialMeal = null,
  passedCategories = []
) {
  const [form, setForm] = useState({
    meal_number: "",
    name: "",
    price: "",
    category: "",
    ingredients: "",
    image: null,
    meal_id: "",
    gluten_free: false,
    spiciness: 0,
  });
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setCategories(passedCategories);
  }, [passedCategories]);

  useEffect(() => {
    if (initialMeal) {
      const validIngredients = (initialMeal.ingredients || []).filter(
        (i) => i?.id && i?.name
      );
      const validAllergens = (initialMeal.allergens || []).filter(
        (a) => a?.id && a?.name
      );
      // console.log(initialMeal);
      setForm({
        meal_number: initialMeal.meal_number || "",
        name: initialMeal.name || "",
        price: initialMeal.price || "",
        category: initialMeal.category || "",
        ingredients: validIngredients,
        allergens: validAllergens,
        image: initialMeal.image_url || null,
        meal_id: initialMeal.meal_id || "",
        gluten_free: initialMeal.gluten_free === true,
        spiciness: initialMeal.spiciness || 0,
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
      meal_number: form.meal_number,
      name: form.name,
      price_value: form.price,
      category_id: form.category,
      ingredients: selectedIngredients,
      allergens: selectedAllergens,
      image_url: imageUrl,
      gluten_free: form.gluten_free,
      spiciness: form.spiciness,
    });

    queryClient.invalidateQueries({ queryKey: ["meals"] });

    setIsSubmitting(false);

    if (result.status === "success") {
      onClose(result.meal); // ← to pełny posiłek, już z meal_id, kategorią itd.
    } else {
      alert(result.message || "Wystąpił błąd przy zapisie");
    }
  };

  const handleDelete = async () => {
    if (!form.meal_id) return;

    const confirmDelete = confirm("Czy na pewno chcesz usunąć ten posiłek?");
    if (!confirmDelete) return;

    setIsSubmitting(true);
    const result = await deleteMeal(form.meal_id, form.image);

    if (result.status === "success") {
      queryClient.invalidateQueries({ queryKey: ["meals"] });
      onClose(null); // zamknij modal
    } else {
      alert(result.message || "Wystąpił błąd przy usuwaniu");
    }
    setIsSubmitting(false);
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit,
    handleDelete,
    isAllergenModalOpen,
    setIsAllergenModalOpen,
    selectedAllergens,
    setSelectedAllergens,
    isIngredientModalOpen,
    setIsIngredientModalOpen,
    selectedIngredients,
    setSelectedIngredients,
    categories,
    isSubmitting,
  };
}
