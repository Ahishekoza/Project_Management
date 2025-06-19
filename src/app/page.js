"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="h-screen w-screen flex flex-col gap-3 items-center justify-center">
      <h1>Abhishek</h1>
      <Button variant={"outline"} className={"cursor-pointer"} onClick={()=>router.push('/dashboard')}>Redirect to dashboard</Button>
    </div>
  );
}
