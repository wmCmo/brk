import type { Metadata, Viewport } from "next";
import { Montserrat, Kanit } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
});

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-kanit'
});

export const viewport: Viewport = {
  themeColor: '#5EA500'
};

const APP_NAME = "Baan Rai Khunya Resort";
const DESCRIPTION = "Cozy Wooden Cottage - Stunning Riverside View in Kanchanaburi";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-full ${montserrat.variable} ${kanit.variable} font-sans bg-zinc-100`}>
        {children}
      </body>
    </html>
  );
}
