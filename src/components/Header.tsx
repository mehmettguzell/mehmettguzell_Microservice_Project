"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/inventory", label: "Inventory" },
    { href: "/product", label: "Products" },
  ];

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MyApp
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
