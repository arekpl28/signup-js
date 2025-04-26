import { useState } from "react";

/**
 * InlineEditField - pole do inline-edit dla tekstu/liczby.
 *
 * Props:
 * - label: Etykieta pola (np. "Miasto")
 * - value: Aktualna wartość
 * - type: "text" | "number" (domyślnie "text")
 * - onSave: Funkcja async wywoływana po zmianie (np. (newValue) => { ... })
 * - disabled: Czy pole zablokowane (opcjonalnie)
 */
export default function InlineEditField({
  label,
  value,
  type = "text",
  onSave,
  disabled = false,
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value ?? "");
  const [loading, setLoading] = useState(false);

  // Gdy klikniesz tekst - edytuj
  function startEdit() {
    if (!disabled) setEditing(true);
  }

  // Obsługa zapisu
  async function handleSave() {
    setEditing(false);
    if (val !== value) {
      setLoading(true);
      await onSave(val);
      setLoading(false);
    }
  }

  // Gdy pole straci focus lub Enter
  function handleBlur() {
    handleSave();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditing(false);
      setVal(value ?? "");
    }
  }

  // Synchronizacja po zmianie value z zewnątrz
  // (np. jak wróci update z serwera)
  React.useEffect(() => {
    setVal(value ?? "");
  }, [value]);

  return (
    <div className="mb-3">
      <div className="text-xs text-gray-500">{label}</div>
      {editing ? (
        <input
          type={type}
          autoFocus
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="border px-2 py-1 rounded w-full"
          disabled={loading}
        />
      ) : (
        <span
          onClick={startEdit}
          className={`block cursor-pointer py-1 px-2 rounded ${disabled ? "bg-gray-100 text-gray-400" : "hover:bg-gray-50"}`}
        >
          {value || (
            <span className="text-gray-300">Kliknij, by edytować...</span>
          )}
        </span>
      )}
    </div>
  );
}
