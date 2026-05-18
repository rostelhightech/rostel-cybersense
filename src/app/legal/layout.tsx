import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions legales",
  description:
    "Politique de confidentialite et conditions generales d'utilisation de la plateforme RoxShield par Rostel High-Tech.",
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
