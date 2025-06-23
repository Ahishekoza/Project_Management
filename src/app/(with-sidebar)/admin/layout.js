"use client";
import { useAuth } from "@/contexts/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// export const metadata = {
//   title: "Admin Dashboard",
//   description: "Only Admin can access these pages",
// };

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [user, router]);

  return <div className="h-full">{children}</div>;
}
