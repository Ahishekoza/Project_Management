// in settings/page.js
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Settings() {
  const { user, logout } = useAuth();

 
  return <div>{user ? <div><Button variant={"destructive"} onClick={()=>logout()}>Signout</Button>{user?.role}</div> : <></>}</div>;
}
