import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const josefinSans = Josefin_Sans({
  variable: "--font-josifinsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WanderLast",
  description: "Explore destinations and book your next trip.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
