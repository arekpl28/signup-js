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
import { useTranslation } from "react-i18next";

export default function RestaurantInfo({ data }) {
  const [editingField, setEditingField] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openingHours, setOpeningHours] = useState(data.opening_hours || []);
  const { t } = useTranslation();

  const info = [
    {
      key: "image",
      icon: Camera,
      label: t("restaurant_image"),
      value: data.image_url,
      isImage: true,
    },
    {
      key: "name",
      icon: Building,
      label: t("restaurant_name"),
      value: data.name,
    },
    { key: "street", icon: MapPin, label: t("street"), value: data.street },
    {
      key: "postal_code",
      icon: MapPin,
      label: t("postal_code"),
      value: data.postal_code,
    },
    { key: "city", icon: MapPin, label: t("city"), value: data.city },
    { key: "country", icon: MapPin, label: t("country"), value: data.country },
    { key: "phone", icon: Phone, label: t("phone_number"), value: data.phone },
    {
      key: "description",
      icon: StickyNote,
      label: t("restaurant_short_description"),
      value: data.description,
    },
    {
      key: "currency_code",
      icon: Banknote,
      label: t("currency"),
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
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--background)] shadow-neumorphic group"
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
                alt={t("restaurant_image")}
                className="w-full max-w-xs h-32 object-cover rounded cursor-pointer border"
                onClick={() => setEditingField(key)}
                title={t("click_to_change_image")}
              />
            ) : (
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setEditingField(key)}
                title={t("click_to_edit")}
              >
                <span className="font-medium">{value || "-"}</span>
                <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* --- Godziny otwarcia --- */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[var(--background)] shadow-neumorphic">
        <Clock className="w-5 h-5 mt-1 text-gray-600" />
        <div className="flex-1">
          <div className="text-xs text-gray-500 mb-1">{t("opening_hours")}</div>
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
                setSuccess(t("saved_successfully"));
              } catch (e) {
                setError(t("opening_hours_save_error"));
              }
              setUpdating(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
