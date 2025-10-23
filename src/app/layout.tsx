import "./globals.css";
import { ThemeProvider } from "next-themes";
import { lufga } from "@/lib/fonts";
import Navbar from "@/components/common/Navbar"

import { Urbanist as UrbanistCreator } from 'next/font/google';

const urbanist = UrbanistCreator({
  subsets: ['latin'],
  variable: '--font-urbanist',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lufga.variable} ${urbanist.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-neutral-900 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
