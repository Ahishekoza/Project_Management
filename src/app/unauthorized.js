"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl text-red-600 font-bold">403 - Unauthorized</h1>
      <p className="text-lg text-center">You do not have permission to view this page.</p>

      <Button variant="outline" onClick={() => router.push("/")}>
        Go to Home
      </Button>
    </div>
  );
}
