"use client";

import { usePathname } from "next/navigation";
import { authNavgations, vendorNavgations } from "../app/constants/utils";
import Link from "next/link";
import { User } from "@deemlol/next-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "./ui/skeleton";

export const NavLinks = () => {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const handleNavigations = () => {
    if (user) {
      switch (user.role) {
        case "admin":
          return authNavgations;
        case "vendor":
          return vendorNavgations;
        default:
          return [];
      }
    }
    return [];
  };

  const navigations = handleNavigations();

  // ---create a skeleton component for loading
  if (loading) {
    return (
      <div className="bg-[#804E49] font-mono md:rounded-tr-sm md:rounded-br-sm h-24 md:h-full flex flex-row md:flex-col gap-4 p-2">
        <div className="flex-grow">
          <ul className="h-full flex flex-row md:flex-col items-center md:py-20 gap-4 md:gap-8">
            {navigations.map((_, index) => (
              <li className="w-full" key={index}>
                <div className="flex items-center p-3 justify-center md:justify-start gap-3">
                  <Skeleton className="h-6 w-6 bg-muted" />
                </div>
              </li>
            ))}
            <li className="block md:hidden w-full">
              <div className="flex items-center p-3 justify-center gap-3">
                <Skeleton className="h-6 w-6 bg-muted" />
              </div>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex items-center p-3 justify-start gap-3">
          <Skeleton className="h-6 w-6 bg-muted" />
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return <div></div>;
  }

  return (
    <div className="bg-[#804E49] font-mono md:rounded-tr-sm md:rounded-br-sm h-24 md:h-full flex flex-row md:flex-col gap-4 p-2">
      <div className="flex-grow">
        <ul className="h-full flex flex-row md:flex-col items-center md:py-20 gap-4 md:gap-8">
          {navigations.map((authNav) => {
            const isActive = pathname === authNav.link;
            return (
              <li className="w-full" key={authNav.link}>
                <Link
                  href={authNav.link}
                  className={`flex items-center p-3 md:justify-start justify-center gap-3
                  ${
                    isActive
                      ? "bg-gray-700"
                      : "hover:bg-gray-700 dark:hover:bg-gray-700 hover:shadow-sm"
                  } transition-colors`}
                  aria-label={authNav.label || authNav.name}
                >
                  <Tooltip>
                    <TooltipTrigger>
                      <span>
                        {authNav.icon({
                          size: 24,
                          color: "#E7DECD",
                          className: "cursor-pointer",
                        })}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{authNav.name}</TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li className="block md:hidden w-full">
            <Link
              href={`/settings`}
              className={`p-3 flex items-center justify-center md:justify-start gap-3 text-[#E7DECD] ${
                pathname === "/settings"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700 dark:hover:bg-gray-700 hover:shadow-sm"
              } transition-colors`}
            >
              <Tooltip>
                <TooltipTrigger>
                  <User size={24} />
                </TooltipTrigger>
                <TooltipContent>User</TooltipContent>
              </Tooltip>
            </Link>
          </li>
        </ul>
      </div>

      <Link
        href={`/settings`}
        className={`hidden p-3 md:flex items-center justify-center md:justify-start gap-3 text-[#E7DECD] ${
          pathname === "/settings"
            ? "bg-gray-700"
            : "hover:bg-gray-700 dark:hover:bg-gray-700 hover:shadow-sm"
        } transition-colors`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <User size={24} />
          </TooltipTrigger>
          <TooltipContent>User</TooltipContent>
        </Tooltip>
      </Link>
    </div>
  );
};
