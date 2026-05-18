import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'equipe RoxShield. Email, WhatsApp, formulaire — nous repondons sous 24 heures.",
  openGraph: {
    title: "Contacter RoxShield — Rostel High-Tech",
    description:
      "Une question, un partenariat ou un devis ? Notre equipe vous repond sous 24h.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
