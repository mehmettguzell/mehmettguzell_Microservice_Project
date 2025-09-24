"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/inventory", label: "Inventory" },
    { href: "/product", label: "Products" },
    { href: "/cart", label: "Cart" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 shadow-lg border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold text-gray-800 hover:text-blue-600 transition-colors duration-300"
        >
          MehmetGuzel
        </Link>

        <nav className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "text-blue-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-blue-500 after:rounded-full"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav
        className={`md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-4 flex flex-col gap-4 transition-all duration-300 ease-in-out ${
          mobileOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-medium text-lg transition-colors duration-300 ${
              pathname === link.href
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
