import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TamboProvider } from '@/components/providers/TamboProvider';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEXUS | Conversational Analytics",
  description: "AI-powered data intelligence platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[#0a0a0f] text-white`} suppressHydrationWarning>
        <TamboProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
        </TamboProvider>
      </body>
    </html>
  );
}