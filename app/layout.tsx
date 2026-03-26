import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adam Ressom",
  description: "Software Engineer based in Washington, D.C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white antialiased`}>
        <ConvexClientProvider>
          <Nav />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}