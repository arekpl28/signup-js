"use client";

import { useRef, useState, useEffect } from "react";
import RestaurantForm from "./RestaurantForm";
import {
  Building,
  MapPin,
  Phone,
  Clock,
  StickyNote,
  Pencil,
  X,
} from "lucide-react";

export default function RestaurantInfo({ data }) {
  const [isEditing, setIsEditing] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsEditing(false);
      }
    }

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const info = [
    { icon: Building, label: "Nazwa", value: data.name },
    { icon: MapPin, label: "Adres", value: data.address },
    { icon: Phone, label: "Telefon", value: data.phone },
    { icon: Clock, label: "Godziny otwarcia", value: data.opening_hours },
    { icon: StickyNote, label: "Opis", value: data.description },
  ];

  return (
    <>
      <div className="space-y-4 mb-6">
        {info.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-3 border px-4 py-3 rounded bg-white shadow"
          >
            <Icon className="w-5 h-5 mt-1 text-gray-600" />
            <div>
              <div className="text-xs text-gray-500">{label}</div>
              <div className="font-medium text-black">{value || "-"}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded hover:opacity-90"
      >
        <Pencil className="w-4 h-4" />
        Edytuj
      </button>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded shadow w-[400px] relative"
          >
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <RestaurantForm
              initialData={data}
              onSuccess={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
