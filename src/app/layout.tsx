import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deepak Dattatray Shevkar — Full-Stack Developer & Designer",
  description:
    "Portfolio of Deepak Dattatray Shevkar — Full-Stack Developer, Graphic Designer, and Video Editor. Crafting complete digital experiences.",
  openGraph: {
    title: "Deepak Dattatray Shevkar — Portfolio",
    description: "Full-Stack Developer, Graphic Designer, & Video Editor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0a0a0a] text-[#f0f0f0]">
        {children}
      </body>
    </html>
  );
}
