"use client";

const NeumorphicCard = ({ children }) => {
  return (
    <section className="flex flex-col w-full max-w-[400px] p-6 sm:p-8 mx-9 mb-16 sm:mx-0 rounded-2xl bg-[var(--background)] shadow-[8px_8px_16px_var(--shadow-dark),_-8px_-8px_16px_var(--shadow-light)]">
      {children}
    </section>
  );
};

export default NeumorphicCard;
