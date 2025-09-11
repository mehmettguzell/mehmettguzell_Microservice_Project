"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function authLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        
        <header style={{backgroundColor: 'lightgray', padding: '1rem'}}>
          <p>Auth Header</p>
        </header>

          <div>
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/');
                return (
                  <Link
                    className={isActive ? 'font-bold mr-4' : 'text-gray-500 mr-4'}
                    href={link.href}
                    key={link.href}
                    >
                    {link.label}
                    </Link>
                );
              })}
          </div>
        
        {children}

        <footer style={{backgroundColor: 'ghostwhite', padding: '1rem', marginTop: '1rem'}}>
          <p>Auth Footer</p>
        </footer>        
        
        </body>
    </html>
  )
}
