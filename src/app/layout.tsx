import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";

export const metadata: Metadata = {
  title: "Future CEO",
  description: "Build your startup. Become a CEO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}
