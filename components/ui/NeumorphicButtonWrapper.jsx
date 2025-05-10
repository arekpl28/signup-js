"use client";

const NeumorphicButtonWrapper = ({ children }) => {
  return (
    <div className="flex items-center justify-center px-4 py-2 rounded-xl bg-[var(--background)] shadow-[4px_4px_8px_var(--shadow-dark),_-4px_-4px_8px_var(--shadow-light)] text-[var(--foreground)] text-sm cursor-pointer transition hover:brightness-95">
      {children}
    </div>
  );
};

export default NeumorphicButtonWrapper;
