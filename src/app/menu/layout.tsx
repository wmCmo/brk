import MobileNav from "@/components/MobileNav";

export default function MenuLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="relative bg-zinc-100 h-screen">
            {children}
            <MobileNav/>
        </div>
    );
}
