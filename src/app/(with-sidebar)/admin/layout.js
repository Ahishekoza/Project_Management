
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard",
  description: "Only Admin can access these pages",
};

export default function AdminLayout({ children }) {

  return <div className="h-full">{children}</div>;
}
