"use client";

import { useEffect, useState } from "react";
import {
  Building,
  MapPin,
  Phone,
  StickyNote,
  Pencil,
  Banknote,
  Camera,
  Clock,
} from "lucide-react";
import RestaurantFormField from "./RestaurantFormField";
import OpeningHoursList from "@/components/restaurant/OpeningHoursList";
import { saveRestaurantHour } from "@/actions/restaurantServer";

export default function RestaurantInfo({ data }) {
  const [editingField, setEditingField] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openingHours, setOpeningHours] = useState(data.opening_hours || []);

  const info = [
    {
      key: "image",
      icon: Camera,
      label: "Zdjęcie restauracji",
      value: data.image_url,
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
  // console.log("DATA z backa:", data);
  // useEffect(() => {
  //   setOpeningHours(data.opening_hours || []);
  // }, [data.opening_hours]);
  // console.log(openingHours);

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

      {/* --- Godziny otwarcia --- */}
      <div className="flex items-start gap-3 border px-2 py-1 rounded text-black bg-white shadow group">
        <Clock className="w-5 h-5 mt-1 text-gray-600" />
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">Godziny otwarcia</div>
          <OpeningHoursList
            hours={openingHours}
            onEdit={async (weekday, value) => {
              setUpdating(true);
              setError("");
              setSuccess("");
              try {
                await saveRestaurantHour(data.id, weekday, value);
                // 🔽 Aktualizuj lokalny stan
                setOpeningHours((prev) => {
                  if (value) {
                    // Dodaj/aktualizuj dzień
                    const withoutDay = prev.filter(
                      (h) => h.weekday !== weekday
                    );
                    return [...withoutDay, value];
                  } else {
                    // Usuwasz (zamknięte)
                    return prev.filter((h) => h.weekday !== weekday);
                  }
                });
                setSuccess("Zapisano!");
              } catch (e) {
                setError("Błąd zapisu godzin.");
              }
              setUpdating(false);
            }}
          />
          {/* {updating && (
            <div className="text-xs text-gray-600 mt-2">Zapisywanie...</div>
          )}
          {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
          {success && (
            <div className="text-xs text-green-600 mt-2">{success}</div>
          )} */}
        </div>
      </div>
    </div>
  );
}
