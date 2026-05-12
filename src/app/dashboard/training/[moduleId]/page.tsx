"use client";

import { use, useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Circle, Clock, Trophy } from "lucide-react";
import { trainingModules } from "@/lib/mock-data";
import Link from "next/link";
import { FadeIn } from "@/components/motion";
import { motion } from "framer-motion";

const quizQuestions = [
  {
    question: "Vous recevez un email de votre \"PDG\" demandant un virement urgent. Que faites-vous ?",
    options: ["J'effectue le virement immédiatement", "Je vérifie l'adresse email de l'expéditeur et je contacte le PDG par un autre canal", "J'ignore l'email", "Je le transfère à un collègue"],
    correct: 1,
  },
  {
    question: "Quel indice vous alerte sur un email de phishing ?",
    options: ["L'email vient d'un collègue connu", "Le sujet mentionne une urgence inhabituelle et contient des fautes", "L'email est envoyé pendant les heures de bureau", "L'email contient le logo de l'entreprise"],
    correct: 1,
  },
  {
    question: "Un SMS vous demande de cliquer sur un lien pour \"vérifier votre compte Mobile Money\". Que faites-vous ?",
    options: ["Je clique pour vérifier mon compte", "Je ne clique pas et je contacte directement mon opérateur Mobile Money", "J'envoie mes identifiants par SMS", "Je transfère le message à mes contacts pour les prévenir"],
    correct: 1,
  },
];

export default function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = use(params);
  const module = trainingModules.find((m) => m.id === moduleId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  if (!module) {
    return (
      <div>
        <Header title="Module introuvable" />
        <div className="p-6">
          <Link href="/dashboard/training">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" />Retour aux formations</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) setScore(score + 1);
    if (currentQuestion < quizQuestions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); }
    else setShowResult(true);
  };

  const lessons = [
    { title: "Introduction au " + module.category.toLowerCase(), done: true },
    { title: "Identifier les signes d'alerte", done: true },
    { title: "Cas pratiques africains", done: false },
    { title: "Bonnes pratiques", done: false },
    { title: "Quiz final", done: false },
  ];

  return (
    <div>
      <Header title={module.title} />
      <div className="space-y-6 p-6">
        <Link href="/dashboard/training">
          <Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />Retour aux formations</Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <FadeIn>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-3xl">{module.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold">{module.title}</h2>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge className="border-0 bg-rht-violet/10 text-rht-violet-light">{module.category}</Badge>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{module.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.1}>
              {!quizStarted ? (
                <Card>
                  <CardHeader><CardTitle className="text-sm">Contenu du module</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lessons.map((lesson, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 rounded-xl border p-3 transition-colors hover:bg-accent"
                        >
                          {lesson.done ? <CheckCircle className="h-5 w-5 text-cyber-green" /> : <Circle className="h-5 w-5 text-muted-foreground/30" />}
                          <span className={`text-sm ${lesson.done ? "text-muted-foreground line-through" : "font-medium"}`}>{lesson.title}</span>
                        </motion.div>
                      ))}
                    </div>
                    <Button className="mt-4 w-full bg-gradient-to-r from-rht-violet to-rht-violet-light text-white hover:opacity-90" onClick={() => setQuizStarted(true)}>
                      Passer au Quiz
                    </Button>
                  </CardContent>
                </Card>
              ) : showResult ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Trophy className="mx-auto mb-4 h-16 w-16 text-rht-orange" />
                    </motion.div>
                    <h3 className="mb-2 text-2xl font-bold">Quiz terminé !</h3>
                    <p className="mb-4 text-lg">Votre score : <span className="font-bold text-rht-violet-light">{score}/{quizQuestions.length}</span></p>
                    <p className="mb-6 text-sm text-muted-foreground">
                      {score === quizQuestions.length ? "Excellent ! Vous maîtrisez ce sujet." : score >= quizQuestions.length / 2 ? "Bon travail ! Continuez à vous former." : "Refaites le module pour améliorer votre score."}
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" onClick={() => { setQuizStarted(false); setCurrentQuestion(0); setSelectedAnswer(null); setScore(0); setShowResult(false); }}>Recommencer</Button>
                      <Link href="/dashboard/training"><Button className="bg-gradient-to-r from-rht-violet to-rht-violet-light text-white hover:opacity-90">Retour aux formations</Button></Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Question {currentQuestion + 1}/{quizQuestions.length}</CardTitle>
                      <Badge variant="outline" className="border-rht-violet/30 text-rht-violet-light">Quiz interactif</Badge>
                    </div>
                    <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="mt-2 h-2" />
                  </CardHeader>
                  <CardContent>
                    <p className="mb-5 text-base font-medium">{quizQuestions[currentQuestion].question}</p>
                    <div className="space-y-2">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <motion.button key={index} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                          onClick={() => setSelectedAnswer(index)}
                          className={`w-full rounded-xl border p-3 text-left text-sm transition-all ${
                            selectedAnswer === index ? "border-rht-violet bg-rht-violet/10 font-medium text-rht-violet-light glow-violet-sm" : "hover:bg-accent"
                          }`}
                        >
                          <span className="mr-2 font-semibold text-muted-foreground">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </motion.button>
                      ))}
                    </div>
                    <Button className="mt-5 w-full bg-gradient-to-r from-rht-violet to-rht-violet-light text-white hover:opacity-90" disabled={selectedAnswer === null} onClick={handleNext}>
                      {currentQuestion < quizQuestions.length - 1 ? "Question suivante" : "Voir les résultats"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </FadeIn>
          </div>

          <div className="space-y-4">
            <FadeIn delay={0.2}>
              <Card>
                <CardHeader><CardTitle className="text-sm">Progression</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Complété</span><span className="font-semibold">40%</span></div>
                    <Progress value={40} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Card>
                <CardHeader><CardTitle className="text-sm">Informations</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Difficulté</span><span className="font-medium">{module.difficulty}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Durée</span><span className="font-medium">{module.duration}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Leçons</span><span className="font-medium">{module.lessons}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Catégorie</span><span className="font-medium">{module.category}</span></div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
