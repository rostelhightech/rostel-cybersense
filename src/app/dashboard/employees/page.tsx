"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Download, Filter } from "lucide-react";
import { employees } from "@/lib/mock-data";
import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

function statusBadge(status: string) {
  switch (status) {
    case "safe":
      return <Badge className="border-0 bg-cyber-green/10 text-cyber-green hover:bg-cyber-green/20">Sûr</Badge>;
    case "moderate":
      return <Badge className="border-0 bg-rht-orange/10 text-rht-orange hover:bg-rht-orange/20">Modéré</Badge>;
    case "at-risk":
      return <Badge className="border-0 bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20">À risque</Badge>;
  }
}

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header title="Employés" />
      <div className="space-y-6 p-6">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Rechercher un employé..." className="h-10 w-full pl-9 sm:w-[300px]" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" />Filtrer</Button>
              <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Exporter</Button>
              <Button size="sm" className="bg-gradient-to-r from-rht-violet to-rht-violet-light text-white hover:opacity-90">
                <UserPlus className="mr-2 h-4 w-4" />Inviter
              </Button>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-3 sm:grid-cols-3">
          {[
            { color: "bg-cyber-green", count: employees.filter((e) => e.status === "safe").length, label: "Zone sûre" },
            { color: "bg-rht-orange", count: employees.filter((e) => e.status === "moderate").length, label: "Risque modéré" },
            { color: "bg-cyber-red", count: employees.filter((e) => e.status === "at-risk").length, label: "À risque" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className={`h-3 w-3 rounded-full ${s.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{s.count}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Tous les employés ({filtered.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-xs font-medium text-muted-foreground">
                      <th className="pb-3 pr-4">Employé</th>
                      <th className="pb-3 pr-4">Département</th>
                      <th className="pb-3 pr-4">Score de risque</th>
                      <th className="pb-3 pr-4">Formations</th>
                      <th className="pb-3 pr-4">Statut</th>
                      <th className="pb-3">Dernière activité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((emp) => (
                      <tr key={emp.id} className="border-b last:border-0 transition-colors hover:bg-accent">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-rht-violet/10 text-[10px] text-rht-violet-light">{emp.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{emp.name}</p>
                              <p className="text-xs text-muted-foreground">{emp.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-sm">{emp.department}</td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <Progress value={emp.riskScore} className="h-2 w-16" />
                            <span className={`text-sm font-semibold ${emp.riskScore <= 30 ? "text-cyber-green" : emp.riskScore <= 60 ? "text-rht-orange" : "text-cyber-red"}`}>
                              {emp.riskScore}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-sm">{emp.trainingsCompleted}/{emp.totalTrainings}</td>
                        <td className="py-3 pr-4">{statusBadge(emp.status)}</td>
                        <td className="py-3 text-sm text-muted-foreground">{emp.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
