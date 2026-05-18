import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demander une demo",
  description:
    "Reservez une demo personnalisee de 30 minutes pour decouvrir comment RoxShield reduit le risque humain dans votre organisation.",
  openGraph: {
    title: "Demo RoxShield — 30 min pour securiser votre equipe",
    description:
      "Simulations de phishing, formations gamifiees, dashboard de risque. Decouvrez RoxShield en direct avec notre equipe.",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
