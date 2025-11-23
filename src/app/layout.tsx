// src/app/layout.tsx — REMOVES THE UNWANTED TOP HEADER ENTIRELY
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// NavBar import removed on purpose — we don't want it here anymore

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Keep95.art',
  description: 'Digital art drops with soul.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* No NavBar here — header now lives only in page.tsx */}
        <main className="min-h-screen bg-black">{children}</main>
      </body>
    </html>
  );
}