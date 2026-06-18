import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ONG VISA DAM - Sensibilisation et Prévention du Cancer",
  description: "Plateforme dédiée à l'information, la sensibilisation et la prévention du cancer. Découvrez les différents types de cancer, les options de dépistage et des témoignages inspirants.",
  keywords: "cancer, prévention, dépistage, sensibilisation, ONG, santé, témoignages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
