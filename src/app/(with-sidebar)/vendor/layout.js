"use client";
import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export const metadata = {
//   title: "Vendor Dashboard",
//   description: "Vendor Can use to track the project",
// };

export default function VendorLayout({ children }) {
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.role !== "vendor") {
      router.push("/unauthorized");
    }
  }, [user, router]);

  return <div className="h-full">{children}</div>;
}
