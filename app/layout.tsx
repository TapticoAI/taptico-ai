import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TapticoAI — The AI Workforce Platform",
  description: "One command. Sixty agents. Zero waiting. Join the beta waitlist for TapticoAI.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
