"use client";

import NeumorphicNavLink from "@/components/ui/NeumorphicNavLink";
import Logout from "../auth/Logout";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

const NavbarClient = ({ user, locale }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <nav className="border-b bg-background w-full">
      {/* Desktop */}
      <div className="hidden sm:flex w-full items-center justify-end px-4 py-4 gap-x-5">
        <NeumorphicNavLink href="/">{t("restaurants")}</NeumorphicNavLink>
        {user && <NeumorphicNavLink href="/menu">Menu</NeumorphicNavLink>}
        {user && (
          <NeumorphicNavLink href="/contact">
            {t("your_restaurant")}
          </NeumorphicNavLink>
        )}
        {!user ? (
          <NeumorphicNavLink href="/login">{t("login")}</NeumorphicNavLink>
        ) : (
          <Logout />
        )}
        <LanguageSwitcher currentLocale={locale} />
      </div>

      {/* Mobile */}
      <div className="sm:hidden px-4 py-4 flex justify-end items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="text-3xl text-[var(--foreground)] focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Dialog with Transition (animated) */}
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex justify-end">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className=" h-full bg-[var(--background)] shadow-neumorphic-inset px-6 py-8 flex flex-col gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="self-end text-2xl text-[var(--foreground)] mb-4"
                >
                  ✕
                </button>

                <NeumorphicNavLink href="/" onClick={() => setOpen(false)}>
                  {t("restaurants")}
                </NeumorphicNavLink>

                {user && (
                  <NeumorphicNavLink
                    href="/menu"
                    onClick={() => setOpen(false)}
                  >
                    Menu
                  </NeumorphicNavLink>
                )}

                {user && (
                  <NeumorphicNavLink
                    href="/contact"
                    onClick={() => setOpen(false)}
                  >
                    {t("your_restaurant")}
                  </NeumorphicNavLink>
                )}

                {!user ? (
                  <NeumorphicNavLink
                    href="/login"
                    onClick={() => setOpen(false)}
                  >
                    {t("login")}
                  </NeumorphicNavLink>
                ) : (
                  <Logout onClick={() => setOpen(false)} />
                )}

                <LanguageSwitcher currentLocale={locale} />
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default NavbarClient;
