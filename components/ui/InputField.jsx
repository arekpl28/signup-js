"use client";

const InputField = ({ id, name, type = "text", placeholder, ...props }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full p-3 rounded-xl bg-[var(--background)] text-[var(--foreground)] placeholder:text-gray-500 shadow-[inset_4px_4px_8px_var(--shadow-dark),_inset_-4px_-4px_8px_var(--shadow-light)] focus:outline-none focus:shadow-[inset_2px_2px_5px_var(--shadow-dark),_inset_-2px_-2px_5px_var(--shadow-light)] transition-shadow"
      {...props}
    />
  );
};

export default InputField;
