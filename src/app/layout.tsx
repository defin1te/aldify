import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aldify - spotify by Aldik",
  description: "Project created for nfactorial incubator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-4 max-w-[60ch] m-auto min-h-screen`}>{children}</body>
    </html>
  );
}
