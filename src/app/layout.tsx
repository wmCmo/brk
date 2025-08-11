import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Baan Rai Khunya Resort",
  description: "รีสอร์ทบ้านไร่คุณย่า",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-full ${montserrat.variable} ${kanit.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
