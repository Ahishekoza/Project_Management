import { NavLinks } from "../../components/navLinks";


export default function SideBarLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* NavLinks Component */}
      <NavLinks />
      <div className="w-full md:w-4/5 p-2 md:p-4 h-full font-serif">{children}</div>
    </div>
  );
}
