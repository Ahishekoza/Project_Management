import { NavLinks } from "../../components/navLinks";

export default function SideBarLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <NavLinks />
      <div className="w-full p-2 md:p-4 h-full overflow-y-auto scroll-smooth font-mono overflow-x-hidden ">
        {children}
      </div>
    </div>
  );
}
