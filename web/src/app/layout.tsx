import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeRegistry } from "../components/ThemeRegistry";
import { ThemeToggle } from "@/components/ThemeToggle";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Gym App",
  description: "Sistema de gerenciamento de academia",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={roboto.variable}>
      <body>
        <ThemeRegistry>
          {children}
          <ThemeToggle />
        </ThemeRegistry>
      </body>
    </html>
  );
}
