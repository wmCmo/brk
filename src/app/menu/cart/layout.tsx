
export default function CartLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="relative h-screen">
            {children}
        </div>
    );
}