import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Organizations ──
  const safiSenegal = await prisma.organization.upsert({
    where: { id: "org_safi_senegal" },
    update: {},
    create: {
      id: "org_safi_senegal",
      name: "SAFI Sénégal",
      plan: "BUSINESS",
      sector: "Finance",
      country: "Sénégal",
      city: "Dakar",
      size: 45,
      isDemo: true,
    },
  });

  const ucad = await prisma.organization.upsert({
    where: { id: "org_ucad" },
    update: {},
    create: {
      id: "org_ucad",
      name: "UCAD - Université Cheikh Anta Diop",
      plan: "CAMPUS",
      sector: "Éducation",
      country: "Sénégal",
      city: "Dakar",
      size: 200,
      isDemo: true,
    },
  });

  const rostelhightech = await prisma.organization.upsert({
    where: { id: "org_rostel" },
    update: {},
    create: {
      id: "org_rostel",
      name: "Rostel High-Tech",
      plan: "ENTERPRISE",
      sector: "Technologie",
      country: "Sénégal",
      city: "Dakar",
      size: 10,
      isDemo: false,
    },
  });

  // ── Users ──
  const hashedDemo = await bcrypt.hash("demo1234", 12);
  const hashedAdmin = await bcrypt.hash("admin2024!", 12);

  // Super Admin (Rostel High-Tech)
  await prisma.user.upsert({
    where: { email: "admin@rostelhightech.com" },
    update: {},
    create: {
      email: "admin@rostelhightech.com",
      name: "Admin Rostel",
      password: hashedAdmin,
      role: "SUPER_ADMIN",
      department: "Direction",
      position: "CEO",
      riskScore: 15,
      organizationId: rostelhightech.id,
    },
  });

  // Demo Admin (SAFI Sénégal)
  await prisma.user.upsert({
    where: { email: "f.sow@safisenegal.com" },
    update: {},
    create: {
      email: "f.sow@safisenegal.com",
      name: "Fatou Sow",
      password: hashedDemo,
      role: "ADMIN",
      department: "IT",
      position: "DSI",
      riskScore: 22,
      organizationId: safiSenegal.id,
    },
  });

  // Demo Employees (SAFI Sénégal)
  const employees = [
    { email: "a.diallo@safisenegal.com", name: "Aminata Diallo", dept: "Finance", position: "Comptable", risk: 68 },
    { email: "m.ndiaye@safisenegal.com", name: "Moussa Ndiaye", dept: "Commercial", position: "Directeur Commercial", risk: 45 },
    { email: "k.ba@safisenegal.com", name: "Khady Ba", dept: "RH", position: "Responsable RH", risk: 38 },
    { email: "o.fall@safisenegal.com", name: "Ousmane Fall", dept: "IT", position: "Développeur", risk: 12 },
    { email: "m.diop@safisenegal.com", name: "Mariama Diop", dept: "Direction", position: "Assistante Direction", risk: 72 },
    { email: "i.sarr@safisenegal.com", name: "Ibrahima Sarr", dept: "Finance", position: "Directeur Financier (CFO)", risk: 55 },
    { email: "a.gueye@safisenegal.com", name: "Awa Gueye", dept: "Commercial", position: "Chargée de clientèle", risk: 61 },
    { email: "p.mendy@safisenegal.com", name: "Pierre Mendy", dept: "IT", position: "Admin Système", risk: 18 },
    { email: "s.toure@safisenegal.com", name: "Souleymane Touré", dept: "Opérations", position: "Responsable Logistique", risk: 43 },
    { email: "n.faye@safisenegal.com", name: "Ndèye Faye", dept: "Juridique", position: "Juriste", risk: 30 },
  ];

  for (const emp of employees) {
    await prisma.user.upsert({
      where: { email: emp.email },
      update: {},
      create: {
        email: emp.email,
        name: emp.name,
        password: hashedDemo,
        role: "EMPLOYEE",
        department: emp.dept,
        position: emp.position,
        riskScore: emp.risk,
        organizationId: safiSenegal.id,
      },
    });
  }

  // Demo account for professor/partner
  await prisma.user.upsert({
    where: { email: "prof@demo.roxshield.com" },
    update: {},
    create: {
      email: "prof@demo.roxshield.com",
      name: "Professeur Démo",
      password: hashedDemo,
      role: "ADMIN",
      department: "Direction",
      position: "Consultant Cybersécurité",
      riskScore: 10,
      organizationId: safiSenegal.id,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log("");
  console.log("📋 Demo accounts:");
  console.log("  Super Admin : admin@rostelhightech.com / admin2024!");
  console.log("  Admin Demo  : f.sow@safisenegal.com / demo1234");
  console.log("  Prof Demo   : prof@demo.roxshield.com / demo1234");
  console.log("  Employee    : a.diallo@safisenegal.com / demo1234");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
