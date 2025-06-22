"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { mockUer } from "./constants/utils";

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    document.cookie = `role=${mockUer.role}; path=/`;

    switch (mockUer.role) {
      case "admin":
        router.push("/admin/dashboard");
        break;
      case "vendor":
        router.push("/vendor/dashboard");
        break;
      default:
        router.push("/unauthorized");
        break;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-3 items-center justify-center">
      <h1>Abhishek</h1>
      <Button
        variant={"outline"}
        className={"cursor-pointer"}
        onClick={handleRedirect}
      >
        Redirect to dashboard
      </Button>
    </div>
  );
}
