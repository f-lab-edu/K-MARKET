import { Geist, Geist_Mono } from "next/font/google";

import "@repo/ui/globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { cn } from "@repo/ui/lib/utils";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          "font-sans antialiased",
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
