export const companyInfo = {
  name: "Rostel CyberSense",
  tagline: "Human Security Training Platform",
  company: "Rostel High-Tech",
  currentOrg: "Safi Congo SARL",
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  riskScore: number;
  trainingsCompleted: number;
  totalTrainings: number;
  lastActive: string;
  avatar: string;
  status: "safe" | "moderate" | "at-risk";
};

export type TrainingModule = {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  completionRate: number;
  lessons: number;
  icon: string;
};

export type SimulationResult = {
  id: string;
  campaign: string;
  type: string;
  sentDate: string;
  totalTargets: number;
  opened: number;
  clicked: number;
  reported: number;
  ignored: number;
};

export type MonthlyStats = {
  month: string;
  riskScore: number;
  trainingsCompleted: number;
  phishingClicked: number;
};

export const employees: Employee[] = [
  {
    id: "1",
    name: "Aminata Diallo",
    email: "a.diallo@saficongo.com",
    department: "Comptabilité",
    role: "Comptable senior",
    riskScore: 25,
    trainingsCompleted: 8,
    totalTrainings: 10,
    lastActive: "2026-05-11",
    avatar: "AD",
    status: "safe",
  },
  {
    id: "2",
    name: "Moussa Ndiaye",
    email: "m.ndiaye@saficongo.com",
    department: "Commercial",
    role: "Directeur commercial",
    riskScore: 72,
    trainingsCompleted: 3,
    totalTrainings: 10,
    lastActive: "2026-05-08",
    avatar: "MN",
    status: "at-risk",
  },
  {
    id: "3",
    name: "Fatou Sow",
    email: "f.sow@saficongo.com",
    department: "RH",
    role: "Responsable RH",
    riskScore: 45,
    trainingsCompleted: 6,
    totalTrainings: 10,
    lastActive: "2026-05-10",
    avatar: "FS",
    status: "moderate",
  },
  {
    id: "4",
    name: "Ibrahima Fall",
    email: "i.fall@saficongo.com",
    department: "IT",
    role: "Administrateur réseau",
    riskScore: 15,
    trainingsCompleted: 10,
    totalTrainings: 10,
    lastActive: "2026-05-12",
    avatar: "IF",
    status: "safe",
  },
  {
    id: "5",
    name: "Coumba Sy",
    email: "c.sy@saficongo.com",
    department: "Direction",
    role: "Assistante de direction",
    riskScore: 58,
    trainingsCompleted: 4,
    totalTrainings: 10,
    lastActive: "2026-05-06",
    avatar: "CS",
    status: "moderate",
  },
  {
    id: "6",
    name: "Ousmane Bâ",
    email: "o.ba@saficongo.com",
    department: "Commercial",
    role: "Chargé de clientèle",
    riskScore: 82,
    trainingsCompleted: 2,
    totalTrainings: 10,
    lastActive: "2026-04-28",
    avatar: "OB",
    status: "at-risk",
  },
  {
    id: "7",
    name: "Mariama Traoré",
    email: "m.traore@saficongo.com",
    department: "Marketing",
    role: "Community Manager",
    riskScore: 38,
    trainingsCompleted: 7,
    totalTrainings: 10,
    lastActive: "2026-05-11",
    avatar: "MT",
    status: "safe",
  },
  {
    id: "8",
    name: "Abdoulaye Diop",
    email: "a.diop@saficongo.com",
    department: "Logistique",
    role: "Responsable logistique",
    riskScore: 65,
    trainingsCompleted: 3,
    totalTrainings: 10,
    lastActive: "2026-05-03",
    avatar: "AD",
    status: "at-risk",
  },
  {
    id: "9",
    name: "Aïssatou Camara",
    email: "a.camara@saficongo.com",
    department: "Comptabilité",
    role: "Aide-comptable",
    riskScore: 30,
    trainingsCompleted: 7,
    totalTrainings: 10,
    lastActive: "2026-05-09",
    avatar: "AC",
    status: "safe",
  },
  {
    id: "10",
    name: "Pape Gueye",
    email: "p.gueye@saficongo.com",
    department: "IT",
    role: "Développeur",
    riskScore: 20,
    trainingsCompleted: 9,
    totalTrainings: 10,
    lastActive: "2026-05-12",
    avatar: "PG",
    status: "safe",
  },
];

export const trainingModules: TrainingModule[] = [
  {
    id: "phishing-101",
    title: "Phishing & Spear-phishing",
    description:
      "Apprenez à identifier les emails de phishing, les liens suspects et les techniques d'hameçonnage ciblé.",
    category: "Phishing",
    duration: "8 min",
    difficulty: "Débutant",
    completionRate: 78,
    lessons: 5,
    icon: "🎣",
  },
  {
    id: "social-engineering",
    title: "Ingénierie sociale",
    description:
      "Comprenez les techniques de manipulation psychologique utilisées par les attaquants pour obtenir des informations.",
    category: "Ingénierie sociale",
    duration: "10 min",
    difficulty: "Intermédiaire",
    completionRate: 54,
    lessons: 6,
    icon: "🎭",
  },
  {
    id: "passwords-mfa",
    title: "Mots de passe & MFA",
    description:
      "Créez des mots de passe robustes et activez l'authentification multi-facteurs pour protéger vos comptes.",
    category: "Authentification",
    duration: "6 min",
    difficulty: "Débutant",
    completionRate: 85,
    lessons: 4,
    icon: "🔐",
  },
  {
    id: "fake-emails",
    title: "Faux emails professionnels",
    description:
      "Détectez les emails frauduleux imitant votre PDG, RH ou fournisseurs. Cas pratiques africains inclus.",
    category: "Phishing",
    duration: "7 min",
    difficulty: "Intermédiaire",
    completionRate: 62,
    lessons: 5,
    icon: "📧",
  },
  {
    id: "device-security",
    title: "Sécurité des appareils",
    description:
      "USB malveillantes, Wi-Fi public, Bluetooth : protégez vos appareils contre les menaces physiques.",
    category: "Sécurité physique",
    duration: "5 min",
    difficulty: "Débutant",
    completionRate: 71,
    lessons: 4,
    icon: "💻",
  },
  {
    id: "social-media-fraud",
    title: "Réseaux sociaux & Fraude",
    description:
      "Arnaque WhatsApp, faux profils, fraude Mobile Money : les menaces spécifiques au contexte africain.",
    category: "Réseaux sociaux",
    duration: "9 min",
    difficulty: "Avancé",
    completionRate: 45,
    lessons: 7,
    icon: "📱",
  },
];

export const simulationResults: SimulationResult[] = [
  {
    id: "sim-1",
    campaign: "Faux email RH — Bulletin de paie",
    type: "Email phishing",
    sentDate: "2026-05-01",
    totalTargets: 10,
    opened: 9,
    clicked: 4,
    reported: 3,
    ignored: 3,
  },
  {
    id: "sim-2",
    campaign: "Faux message PDG — Virement urgent",
    type: "Spear-phishing",
    sentDate: "2026-04-15",
    totalTargets: 10,
    opened: 8,
    clicked: 6,
    reported: 1,
    ignored: 3,
  },
  {
    id: "sim-3",
    campaign: "Faux fournisseur — Facture à régler",
    type: "Email phishing",
    sentDate: "2026-03-28",
    totalTargets: 10,
    opened: 10,
    clicked: 5,
    reported: 2,
    ignored: 3,
  },
];

export const monthlyStats: MonthlyStats[] = [
  { month: "Jan", riskScore: 68, trainingsCompleted: 12, phishingClicked: 8 },
  { month: "Fév", riskScore: 62, trainingsCompleted: 18, phishingClicked: 7 },
  { month: "Mar", riskScore: 55, trainingsCompleted: 25, phishingClicked: 5 },
  { month: "Avr", riskScore: 48, trainingsCompleted: 34, phishingClicked: 4 },
  { month: "Mai", riskScore: 42, trainingsCompleted: 41, phishingClicked: 3 },
];

export const departmentStats = [
  { name: "IT", riskScore: 18, employees: 2 },
  { name: "Comptabilité", riskScore: 28, employees: 2 },
  { name: "Marketing", riskScore: 38, employees: 1 },
  { name: "RH", riskScore: 45, employees: 1 },
  { name: "Direction", riskScore: 58, employees: 1 },
  { name: "Logistique", riskScore: 65, employees: 1 },
  { name: "Commercial", riskScore: 77, employees: 2 },
];

export const currentUser = {
  id: "3",
  name: "Fatou Sow",
  email: "f.sow@saficongo.com",
  role: "admin",
  org: "Safi Congo SARL",
};

export const badges = [
  {
    id: "cyber-defender",
    name: "Cyber Defender",
    description: "5 modules complétés",
    icon: "🛡️",
    earned: true,
  },
  {
    id: "phishing-hunter",
    name: "Phishing Hunter",
    description: "3 simulations signalées",
    icon: "🎯",
    earned: true,
  },
  {
    id: "perfect-score",
    name: "Score Parfait",
    description: "100% sur un quiz",
    icon: "⭐",
    earned: false,
  },
  {
    id: "streak-7",
    name: "7 jours consécutifs",
    description: "Connexion 7 jours de suite",
    icon: "🔥",
    earned: false,
  },
];
