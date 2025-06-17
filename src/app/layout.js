"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { authNavgations } from "./constants/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "@deemlol/next-icons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Project Management",
//   description: "Manage your project with eazy",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">
          <div className="bg-[#804E49] w-1/5 rounded-tr-sm rounded-br-sm h-full flex flex-col p-2">
            <div className=" flex-grow">
              <ul className="h-full flex flex-col items-center md:py-20 gap-4 md:gap-8">
                {authNavgations.map((authNav) => {
                  const isActive = pathname === authNav.link;
                  return (
                    <li className="w-full" key={authNav.link}>
                      <Link
                        href={authNav.link}
                        className={`flex items-center p-3 
                md:justify-start justify-center 
                ${
                  isActive
                    ? "bg-gray-700"
                    : "hover:bg-gray-700 dark:hover:bg-gray-700 hover:shadow-sm"
                } 
                transition-colors`}
                        aria-label={authNav.label || authNav.name}
                      >
                        <span>
                          {authNav.icon({
                            size: 24,
                            color: "#E7DECD",
                          })}
                        </span>
                        <span className="text-[#E7DECD] hidden md:block ml-3">
                          {authNav.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Link
              href={"/settings"}
              className={`p-3 flex items-center justify-center md:justify-start gap-4 text-[#E7DECD] ${
                pathname === '/settings'
                  ? "bg-gray-700"
                  : "hover:bg-gray-700 dark:hover:bg-gray-700 hover:shadow-sm"
              }  transition-colors`}
            >
              <span>
                <User size={24} />
              </span>
              <span className="hidden md:block">User</span>
            </Link>
          </div>
          <div className="w-4/5 p-2 h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
