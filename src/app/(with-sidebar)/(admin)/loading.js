import { RotateCw } from "@deemlol/next-icons";

export default function SideBarContentLoading() {
  return (
    <div className="h-full bg-opacity-50 text-[#804E49] flex flex-col gap-2 items-center justify-center z-50">
      <RotateCw size={36} className="animate-spin" />
      <span className="text-md md:text-xl font-bold font-mono">Your data is getting ready !</span>
    </div>
  );
}
