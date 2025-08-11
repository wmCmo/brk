
export default function CartLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="relative bg-zinc-100">
            {children}
        </div>
    );
}