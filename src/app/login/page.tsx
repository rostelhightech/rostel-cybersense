"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 bg-sidebar lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(156,30,153,0.15),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(250,153,14,0.08),transparent_50%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-md text-center"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-rht-violet to-rht-violet-light glow-violet"
          >
            <Shield className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="mb-4 text-3xl font-bold text-sidebar-foreground">Rostel CyberSense</h1>
          <p className="text-lg text-sidebar-foreground/60">Human Security Training Platform</p>
          <div className="mt-8 space-y-4 text-left">
            {[
              "Simulations de phishing réalistes",
              "Micro-formations gamifiées",
              "Dashboard de risque humain en temps réel",
              "Conçu pour le contexte africain",
            ].map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 text-sidebar-foreground/70"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rht-violet/20">
                  <svg className="h-3.5 w-3.5 text-rht-violet-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-xs text-sidebar-foreground/30">by Rostel High-Tech — www.rostelhightech.com</p>
        </motion.div>
      </div>

      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-none lg:border lg:shadow-sm">
            <CardContent className="p-8">
              <div className="mb-8 text-center lg:hidden">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-rht-violet to-rht-violet-light glow-violet-sm">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-xl font-bold">Rostel CyberSense</h2>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Connexion</h2>
                <p className="mt-1 text-sm text-muted-foreground">Accédez à votre espace de formation en cybersécurité</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" defaultValue="f.sow@saficongo.com" className="h-11" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <button type="button" className="text-xs text-rht-violet-light hover:underline">Mot de passe oublié ?</button>
                  </div>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" defaultValue="demo1234" className="h-11 pr-10" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" className="h-11 w-full bg-gradient-to-r from-rht-violet to-rht-violet-light text-sm font-semibold text-white hover:opacity-90" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Connexion en cours...
                      </span>
                    ) : "Se connecter"}
                  </Button>
                </motion.div>
              </form>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Pas encore de compte ? <button className="font-medium text-rht-violet-light hover:underline">Contactez votre administrateur</button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
