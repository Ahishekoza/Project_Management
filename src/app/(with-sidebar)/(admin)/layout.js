
export const metadata ={
    title:"Admin Dashboard",
    description:"Only Admin can access these pages"
}

export default function SideBarContentLayout({children}) {
    return (
        <div className="h-full">{children}</div>
    );
}