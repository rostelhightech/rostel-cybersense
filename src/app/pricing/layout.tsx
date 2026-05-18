import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs & Plans",
  description:
    "Starter, Business, Enterprise ou Campus — choisissez le plan RoxShield adapte a votre organisation. Essai gratuit, sans engagement.",
  openGraph: {
    title: "Tarifs RoxShield — Cybersecurite humaine pour l'Afrique",
    description:
      "A partir de 7 500 FCFA/utilisateur/mois. Simulations de phishing, formations gamifiees, dashboard de risque.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
