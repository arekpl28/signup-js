"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function OpeningHoursList({ hours = [], onEdit }) {
  const hoursMap = Object.fromEntries(hours.map((h) => [h.weekday, h]));
  const [editingDay, setEditingDay] = useState(null);
  const { t } = useTranslation();
  const dniTygodnia = [
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
    t("sunday"),
  ];

  return (
    <div className="flex flex-col gap-4 ">
      {dniTygodnia.map((day, i) => (
        <div key={i} className="flex items-start w-full gap-4">
          {/* nazwa dnia */}
          <div className="w-24 shrink-0 text-sm text-[var(--foreground)]">
            {day}
          </div>

          {/* godziny + przycisk edycji */}
          <div className="flex justify-between items-center flex-1">
            {editingDay === i ? (
              <EditDayForm
                weekday={i}
                value={hoursMap[i]}
                onSave={(data) => {
                  onEdit(i, data);
                  setEditingDay(null);
                }}
                onCancel={() => setEditingDay(null)}
              />
            ) : (
              <>
                <span className="text-sm text-[var(--foreground)]">
                  {hoursMap[i]
                    ? `${hoursMap[i].open_time.slice(0, 5)} – ${hoursMap[i].close_time.slice(0, 5)}`
                    : "Zamknięte"}
                </span>
                <button
                  onClick={() => setEditingDay(i)}
                  className="text-gray-400 hover:text-blue-600 transition"
                  title="Edytuj"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function EditDayForm({ weekday, value, onSave, onCancel }) {
  const [open, setOpen] = useState(value?.open_time || "");
  const [close, setClose] = useState(value?.close_time || "");

  return (
    <form
      className="flex flex-col gap-2 w-full max-w-[250px]"
      onSubmit={(e) => {
        e.preventDefault();
        if (!open || !close) return;
        onSave({ weekday, open_time: open, close_time: close });
      }}
    >
      <div className="flex items-center gap-2">
        <input
          type="time"
          value={open}
          onChange={(e) => setOpen(e.target.value)}
          required
        />
        <span className="text-[var(--foreground)]">–</span>
        <input
          type="time"
          value={close}
          onChange={(e) => setClose(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          className="px-1 py-2 rounded-xl text-sm text-red-600 bg-[var(--background)] shadow-neumorphic transition hover:brightness-95 active:shadow-neumorphic-inset"
          onClick={() => onSave(null)}
          title="Ustaw jako zamknięte"
        >
          Zamknięte
        </button>

        <button
          type="submit"
          className="px-1 py-2 rounded-xl text-sm text-blue-600 bg-[var(--background)] shadow-neumorphic transition hover:brightness-95 active:shadow-neumorphic-inset"
        >
          Zapisz
        </button>

        <button
          type="button"
          className="px-1 py-2 rounded-xl text-sm text-gray-600 bg-[var(--background)] shadow-neumorphic transition hover:brightness-95 active:shadow-neumorphic-inset"
          onClick={onCancel}
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}
