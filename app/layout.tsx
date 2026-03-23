import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ThesisForge — AI Research Idea Generator for Engineering Students",
  description:
    "Generate tailored thesis research ideas for Electrical, Mechanical, Metallurgy, Chemical, and Computer Science engineering using GPT-4o. Get feasibility scores, methodology guides, and experiment designs instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-950 text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
