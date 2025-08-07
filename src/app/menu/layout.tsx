import MobileNav from "@/components/MobileNav";

export default function MenuLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="relative h-screen">
            {children}
            <MobileNav/>
        </div>
    );
}
