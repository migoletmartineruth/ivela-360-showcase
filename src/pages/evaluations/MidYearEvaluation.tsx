import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ClipboardCheck, User, Users, Star, CheckCircle2 } from 'lucide-react';
import { evaluations360, users } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function MidYearEvaluationPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [performanceScore, setPerformanceScore] = useState([3.5]);
  const [confianceScore, setConfianceScore] = useState([4]);
  const [abcdScores, setAbcdScores] = useState({ a: [4], b: [3.5], c: [4], d: [3] });

  const handleSubmit = () => {
    toast.success('Évaluation 360° soumise', {
      description: 'Power Automate: Item créé dans Ivela_MidYear360'
    });
    setIsFormOpen(false);
  };

  const getUser = (id: string) => users.find(u => u.id === id);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Évaluation 360° Mi-Parcours" 
        subtitle="Feedback à mi-année sur la performance et les comportements"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <ClipboardCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-muted-foreground">Auto-évaluations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-success/10 p-3">
                  <User className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">76</p>
                  <p className="text-xs text-muted-foreground">Évaluations N+1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-info/10 p-3">
                  <Users className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">142</p>
                  <p className="text-xs text-muted-foreground">Évaluations pairs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-warning/10 p-3">
                  <Star className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3.8</p>
                  <p className="text-xs text-muted-foreground">Moyenne globale</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Card className="border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors shadow-card">
              <CardContent className="py-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <ClipboardCheck className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-foreground">Remplir une évaluation 360°</p>
                    <p className="text-sm text-muted-foreground">
                      Formulaire MS Forms → Ivela_MidYear360
                    </p>
                  </div>
                  <Button>Commencer</Button>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Évaluation 360° Mi-Parcours</DialogTitle>
              <DialogDescription>
                Formulaire d'évaluation - Simule MS Forms
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Performance */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Note de Performance</Label>
                <p className="text-sm text-muted-foreground">
                  Évaluez l'atteinte des objectifs (What)
                </p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={performanceScore}
                    onValueChange={setPerformanceScore}
                    min={1}
                    max={5}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold w-16 text-center text-primary">
                    {performanceScore[0]}
                  </span>
                </div>
              </div>

              {/* Confiance */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Niveau de Confiance</Label>
                <p className="text-sm text-muted-foreground">
                  Évaluez votre confiance dans ce collaborateur
                </p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={confianceScore}
                    onValueChange={setConfianceScore}
                    min={1}
                    max={5}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-2xl font-bold w-16 text-center text-success">
                    {confianceScore[0]}
                  </span>
                </div>
              </div>

              {/* ABCD */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Comportements ABCD</Label>
                {[
                  { key: 'a', label: 'A - Agilité & Innovation' },
                  { key: 'b', label: 'B - Business Mindset' },
                  { key: 'c', label: 'C - Collaboration' },
                  { key: 'd', label: 'D - Développement' },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm">{label}</Label>
                      <span className="text-sm font-medium text-primary">
                        {abcdScores[key as keyof typeof abcdScores][0]}
                      </span>
                    </div>
                    <Slider
                      value={abcdScores[key as keyof typeof abcdScores]}
                      onValueChange={(val) => setAbcdScores(prev => ({ ...prev, [key]: val }))}
                      min={1}
                      max={5}
                      step={0.5}
                    />
                  </div>
                ))}
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Commentaires</Label>
                <Textarea
                  placeholder="Points forts, axes d'amélioration, recommandations..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSubmit}>
                Soumettre l'évaluation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Evaluations List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Évaluations Récentes</CardTitle>
            <CardDescription>Liste SharePoint: Ivela_MidYear360</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="auto">Auto-évaluations</TabsTrigger>
                <TabsTrigger value="n1">N+1</TabsTrigger>
                <TabsTrigger value="pairs">Pairs</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <div className="space-y-3">
                  {evaluations360.map((eval360, index) => {
                    const collaborateur = getUser(eval360.collaborateurId);
                    const evaluateur = getUser(eval360.evaluateurId);
                    return (
                      <div 
                        key={eval360.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg bg-muted/50 animate-slide-up opacity-0",
                          `stagger-${index + 1}`
                        )}
                        style={{ animationFillMode: 'forwards' }}
                      >
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {collaborateur?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{collaborateur?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Par: {evaluateur?.name} ({eval360.evaluateurType})
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-primary">{eval360.notePerformance}</p>
                            <p className="text-xs text-muted-foreground">Perf.</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-success">{eval360.noteConfiance}</p>
                            <p className="text-xs text-muted-foreground">Conf.</p>
                          </div>
                          <Badge variant="outline" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {eval360.statut}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
