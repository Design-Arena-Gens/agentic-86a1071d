import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Coding Hub - Tüm AI Kodlama Araçları Tek Platformda",
  description: "2025'in en iyi AI kodlama araçlarına tek yerden erişin. Cursor, Windsurf, Copilot, Lovable, Bolt, v0 ve daha fazlası.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
