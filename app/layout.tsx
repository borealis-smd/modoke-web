import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "@/app/Provider";

// Fonte usada no nosso projeto é a Poppins
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
