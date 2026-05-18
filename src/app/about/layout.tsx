import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A propos",
  description:
    "Decouvrez Rostel High-Tech et l'equipe derriere RoxShield — la plateforme de cybersecurite humaine pensee pour l'Afrique.",
  openGraph: {
    title: "A propos de RoxShield — Par Rostel High-Tech",
    description:
      "Notre mission : rendre la cybersecurite humaine accessible, engageante et mesurable pour chaque organisation en Afrique.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
