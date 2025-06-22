
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Vendor Dashboard",
  description: "Vendor Can use to track the project",
};

export default function VendorLayout({ children }) {


  return <div className="h-full">{children}</div>;
}
