import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | El Archivo del Druida',
    default: 'El Archivo del Druida', 
  },
  description: "Tu portal al conocimiento y la historia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <Navbar variant="floating" />
        
        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}