
export const metadata = {
    title : 'Admin Content',
    description : 'Only Admin can access'
}

export default function AdminLayout({children}) {
    return (
        <section className="h-full">
            
            {children}
        </section>
    );
}