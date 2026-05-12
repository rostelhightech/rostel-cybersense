"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Crosshair, Send, MousePointerClick, Flag, AlertTriangle } from "lucide-react";
import { simulationResults } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FadeIn, StaggerContainer, StaggerItem, GlowCard } from "@/components/motion";
import { motion } from "framer-motion";

const chartData = simulationResults.map((sim) => ({
  name: sim.campaign.length > 25 ? sim.campaign.slice(0, 25) + "…" : sim.campaign,
  Cliqué: sim.clicked, Signalé: sim.reported, Ignoré: sim.ignored,
}));

export default function SimulationsPage() {
  const totalSent = simulationResults.reduce((a, s) => a + s.totalTargets, 0);
  const totalClicked = simulationResults.reduce((a, s) => a + s.clicked, 0);
  const totalReported = simulationResults.reduce((a, s) => a + s.reported, 0);

  return (
    <div>
      <Header title="Simulations de phishing" />
      <div className="space-y-6 p-6">
        <FadeIn>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Testez la vigilance de vos équipes avec des campagnes de phishing simulées</p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-gradient-to-r from-rht-orange to-rht-orange-light text-white glow-orange-sm hover:opacity-90">
                <Send className="mr-2 h-4 w-4" />Nouvelle campagne
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-4 sm:grid-cols-4">
          {[
            { icon: Crosshair, value: simulationResults.length, label: "Campagnes", color: "rht-violet" },
            { icon: Send, value: totalSent, label: "Emails envoyés", color: "rht-violet-light" },
            { icon: MousePointerClick, value: Math.round((totalClicked / totalSent) * 100) + "%", label: "Taux de clic", color: "cyber-red", textColor: "text-cyber-red" },
            { icon: Flag, value: Math.round((totalReported / totalSent) * 100) + "%", label: "Taux de signalement", color: "cyber-green", textColor: "text-cyber-green" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <GlowCard>
                <Card className="transition-all duration-300 hover:border-rht-violet/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${s.color}/10`}>
                        <s.icon className={`h-5 w-5 text-${s.color}`} />
                      </div>
                      <div>
                        <p className={`text-2xl font-bold ${s.textColor || ""}`}>{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Résultats par campagne</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                    <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px", color: "var(--foreground)" }} />
                    <Legend />
                    <Bar dataKey="Cliqué" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Signalé" fill="#25d366" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Ignoré" fill="#fa990e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Historique des campagnes</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {simulationResults.map((sim, i) => {
                  const clickRate = Math.round((sim.clicked / sim.totalTargets) * 100);
                  const reportRate = Math.round((sim.reported / sim.totalTargets) * 100);
                  return (
                    <motion.div key={sim.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                      className="rounded-xl border p-4 transition-colors hover:bg-accent"
                    >
                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-semibold">{sim.campaign}</h3>
                          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-[10px]">{sim.type}</Badge>
                            <span>{sim.sentDate}</span><span>{sim.totalTargets} cibles</span>
                          </div>
                        </div>
                        {clickRate > 40 && (
                          <Badge className="w-fit border-0 bg-cyber-red/10 text-cyber-red"><AlertTriangle className="mr-1 h-3 w-3" />Taux de clic élevé</Badge>
                        )}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-4">
                        <div><p className="text-xs text-muted-foreground">Ouvert</p><p className="text-lg font-bold">{Math.round((sim.opened / sim.totalTargets) * 100)}%</p></div>
                        <div><p className="text-xs text-muted-foreground">Cliqué</p><p className="text-lg font-bold text-cyber-red">{clickRate}%</p></div>
                        <div><p className="text-xs text-muted-foreground">Signalé</p><p className="text-lg font-bold text-cyber-green">{reportRate}%</p></div>
                        <div><p className="text-xs text-muted-foreground">Ignoré</p><p className="text-lg font-bold text-muted-foreground">{Math.round((sim.ignored / sim.totalTargets) * 100)}%</p></div>
                      </div>
                      <Progress value={clickRate} className="mt-3 h-2" />
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
