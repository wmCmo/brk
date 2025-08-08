import type { Metadata } from "next";
import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono'
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
    <html lang="en" className="h-svh">
      <body className={`${montserrat.className} h-full`}>
        {/* <Nav /> */}
        {children}
      </body>
    </html>
  );
}
