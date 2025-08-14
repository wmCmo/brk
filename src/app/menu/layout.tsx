import MobileNav from "@/components/MobileNav";
import { Metadata } from "next";

const pageTitle = 'Online Menu';
const pageDesc = 'สั่งอาหารออนไลน์บ้านไร่คุณย่า Quick Order at BRK';

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
        title: pageTitle,
        description: pageDesc,
        images: [
            {
                url: 'https://res.cloudinary.com/dbapq0zhz/image/upload/v1755189709/menu-banner_pvs4lv.png',
                width: 1200,
                height: 630,
                alt: 'Baan Rai Khunya online menu minimal banner'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDesc,
        images: ['https://res.cloudinary.com/dbapq0zhz/image/upload/v1755189709/menu-banner_pvs4lv.png'],
        creator: '@heisei_15'
    }
};

export default function MenuLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <div className="relative bg-zinc-100 h-screen">
            {children}
            <MobileNav />
        </div>
    );
}
