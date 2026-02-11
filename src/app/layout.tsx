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
        <div className="fixed inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="w-px h-full border-r border-dashed border-gray-300/60"></div>
          <div className="w-px h-full border-r border-dashed border-gray-300/60 hidden sm:block"></div>
          <div className="w-px h-full border-r border-dashed border-gray-300/60 hidden md:block"></div>
          <div className="w-px h-full border-r border-dashed border-gray-300/60"></div>
        </div>
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}
