"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1>Abhishek</h1>
      <button onClick={()=>router.push('/dashboard')}>Redirect to dashboard</button>
    </div>
  );
}
