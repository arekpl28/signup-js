"use client";

import { useState } from "react";
import {
  Building,
  MapPin,
  Phone,
  Clock,
  StickyNote,
  Pencil,
  Banknote,
  Camera,
} from "lucide-react";
import RestaurantFormField from "./RestaurantFormField";

export default function RestaurantInfo({ data }) {
  // Które pole edytujesz?
  const [editingField, setEditingField] = useState(null);

  // Wszystkie pola i ich nazwy
  const info = [
    {
      key: "image",
      icon: Camera,
      label: "Zdjęcie restauracji",
      value: data.image_url, // <-- nazwa pola z bazy (np. image_url)
      isImage: true,
    },
    { key: "name", icon: Building, label: "Nazwa", value: data.name },
    { key: "street", icon: MapPin, label: "Ulica", value: data.street },
    {
      key: "postal_code",
      icon: MapPin,
      label: "Kod pocztowy",
      value: data.postal_code,
    },
    { key: "city", icon: MapPin, label: "Miasto", value: data.city },
    { key: "country", icon: MapPin, label: "Kraj", value: data.country },
    { key: "phone", icon: Phone, label: "Telefon", value: data.phone },
    {
      key: "opening_hours",
      icon: Clock,
      label: "Godziny otwarcia",
      value: data.opening_hours,
    },
    {
      key: "description",
      icon: StickyNote,
      label: "Opis",
      value: data.description,
    },
    {
      key: "currency_code",
      icon: Banknote,
      label: "Waluta",
      value: data.currency_code,
    },
  ];

  return (
    <div className="space-y-4 mb-6">
      {info.map(({ key, icon: Icon, label, value, isImage }) => (
        <div
          key={key}
          className="flex items-center gap-3 border px-4 py-3 rounded bg-white shadow group"
        >
          <Icon className="w-5 h-5 mt-1 text-gray-600" />
          <div className="flex-1">
            <div className="text-xs text-gray-500">{label}</div>
            {editingField === key ? (
              <RestaurantFormField
                field={key}
                value={value}
                initialData={data}
                onDone={() => setEditingField(null)}
              />
            ) : isImage ? (
              // PODGLĄD ZDJĘCIA
              <img
                src={value || "/no-image.png"}
                alt="Zdjęcie restauracji"
                className="w-full max-w-xs h-32 object-cover rounded cursor-pointer border"
                onClick={() => setEditingField(key)}
                title="Kliknij, by zmienić zdjęcie"
              />
            ) : (
              <div
                className="font-medium text-black cursor-pointer group-hover:underline"
                onClick={() => setEditingField(key)}
                title="Kliknij, by edytować"
              >
                {value || "-"}
                <Pencil className="inline w-4 h-4 ml-2 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
