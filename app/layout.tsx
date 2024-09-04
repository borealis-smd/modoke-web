import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Provider from "@/app/Provider";

// Fonte usada no nosso projeto é a Nunito
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "modoke",
  description:
    "Apredendo sobre acessibilidade web de forma simples e divertida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
