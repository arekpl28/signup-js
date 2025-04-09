"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AllergenSelectorModal({
  isOpen,
  onClose,
  selected,
  onSave,
}) {
  const [allergens, setAllergens] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState(selected || []);

  useEffect(() => {
    const fetchAllergens = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("allergens")
        .select("id, name")
        .order("name", { ascending: true });

      if (!error) setAllergens(data);
    };

    if (isOpen) {
      fetchAllergens();
    }
  }, [isOpen]);

  const toggleAllergen = (allergen) => {
    setSelectedAllergens((prev) => {
      const exists = prev.find((a) => a.id === allergen.id);
      return exists
        ? prev.filter((a) => a.id !== allergen.id)
        : [...prev, allergen];
    });
  };

  const handleSave = () => {
    onSave(selectedAllergens);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white rounded-xl p-6 w-[90%] max-w-lg">
          <DialogTitle className="text-xl font-bold mb-4">
            Wybierz alergeny
          </DialogTitle>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            {allergens.map((allergen) => (
              <label key={allergen.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAllergens.some((a) => a.id === allergen.id)}
                  onChange={() => toggleAllergen(allergen)}
                />
                {allergen.name}
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="text-gray-600">
              Anuluj
            </button>
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
            >
              Zapisz
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
