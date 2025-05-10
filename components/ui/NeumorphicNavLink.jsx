"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { getPathWithoutLocale } from "@/utils/getPathWithoutLocale";

const NeumorphicNavLink = ({ href, children }) => {
  const pathname = usePathname();
  const cleanPath = getPathWithoutLocale(pathname);

  const isActive = cleanPath === href;

  return (
    <Link href={href}>
      <div
        className={clsx(
          "px-4 py-2 rounded-xl text-sm shadow-neumorphic transition hover:brightness-95 active:shadow-neumorphic-inset",
          "bg-[var(--background)] text-[var(--foreground)]",
          isActive && "shadow-neumorphic-inset font-semibold brightness-90"
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export default NeumorphicNavLink;
