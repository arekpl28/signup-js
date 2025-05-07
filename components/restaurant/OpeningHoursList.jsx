// components/restaurant/OpeningHoursList.jsx

"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function OpeningHoursList({ hours = [], onEdit }) {
  // Zamieniamy tablicę na mapę: { 0: {open_time...}, 1: {...} }
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
    <div className="flex flex-col gap-2">
      {dniTygodnia.map((day, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="w-32">{day}</span>
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
          ) : hoursMap[i] ? (
            <>
              <span>
                {hoursMap[i].open_time.slice(0, 5)} –{" "}
                {hoursMap[i].close_time.slice(0, 5)}{" "}
              </span>
              <button onClick={() => setEditingDay(i)}>Edytuj</button>
            </>
          ) : (
            <>
              <span className="text-gray-400">Zamknięte</span>
              <button onClick={() => setEditingDay(i)}>Ustaw godziny</button>
            </>
          )}
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
      className="flex flex-col gap-2 items-start"
      onSubmit={(e) => {
        e.preventDefault();
        if (!open || !close) return;
        onSave({ weekday, open_time: open, close_time: close });
      }}
    >
      <div className="flex gap-2 items-center">
        <input
          type="time"
          value={open}
          onChange={(e) => setOpen(e.target.value)}
          required
        />
        <span>-</span>
        <input
          type="time"
          value={close}
          onChange={(e) => setClose(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 mt-1">
        <button type="submit" className="text-blue-600">
          Zapisz
        </button>
        <button type="button" onClick={onCancel}>
          Anuluj
        </button>
        <button
          type="button"
          className="text-red-600"
          onClick={() => onSave(null)}
          title="Ustaw jako zamknięte"
        >
          Zamknięte
        </button>
      </div>
    </form>
  );
}
