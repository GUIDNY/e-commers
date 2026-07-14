"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CartIcon, MenuIcon } from "./Icons";
import { useCart } from "./CartContext";

const NAV_LINKS = [
  { href: "/", label: "בית" },
  { href: "/products", label: "כל המוצרים" },
  { href: "/#shipping", label: "משלוחים לישראל" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-camp-sand-200 bg-camp-sand-50/90 shadow-[0_1px_3px_rgba(31,51,39,0.06)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-camp-forest-900">
          <Image src="/logo-icon.png" alt="" width={40} height={25} className="h-9 w-auto" priority />
          <span className="text-lg font-extrabold tracking-tight">
            קמפ<span className="text-camp-amber-600">איזי</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-camp-bark-800 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-camp-forest-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-camp-forest-900 transition hover:bg-camp-sand-200"
            aria-label="עגלת קניות"
          >
            <CartIcon className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -left-1 grid h-5 w-5 place-items-center rounded-full bg-camp-amber-600 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-camp-forest-900 hover:bg-camp-sand-200 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="תפריט"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-camp-sand-200 px-4 py-3 text-sm font-medium text-camp-bark-800 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 hover:bg-camp-sand-200"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
