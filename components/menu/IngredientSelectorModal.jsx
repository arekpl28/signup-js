"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useTranslation } from "react-i18next";

export default function IngredientSelectorModal({
  isOpen,
  onClose,
  selected,
  onSave,
}) {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    selected || []
  );
  const { t } = useTranslation();

  useEffect(() => {
    const fetchIngredients = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("ingredients")
        .select("id, name")
        .order("name", { ascending: true });

      if (!error) setIngredients(data);
    };

    if (isOpen) {
      fetchIngredients();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIngredients(selected || []);
  }, [selected]);

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
      const exists = prev.find((i) => i.id === ingredient.id);
      return exists
        ? prev.filter((i) => i.id !== ingredient.id)
        : [...prev, ingredient];
    });
  };

  const handleSave = () => {
    onSave(selectedIngredients);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-xl p-6 w-[90%] max-w-lg text-black">
          <DialogTitle className="text-xl font-bold mb-4">
            {t("select_ingredients")}
          </DialogTitle>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto text-black">
            {ingredients.map((ingredient) => (
              <label
                key={ingredient.id}
                className="inline-flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedIngredients.some(
                    (i) => i.id === ingredient.id
                  )}
                  onChange={() => toggleIngredient(ingredient)}
                />
                {ingredient.name}
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="text-gray-600">
              {t("cancel")}
            </button>
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
            >
              {t("save")}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
