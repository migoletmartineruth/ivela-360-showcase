import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalibrationChart } from '@/components/dashboard/CalibrationChart';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  BarChart3
} from 'lucide-react';
import { divisions, users } from '@/data/mockData';
import { cn } from '@/lib/utils';

const calibrationSessions = [
  { id: 1, division: 'Production', date: '2025-12-15', status: 'Planifiée', participants: 8, completed: 0 },
  { id: 2, division: 'Finance', date: '2025-12-16', status: 'Planifiée', participants: 5, completed: 0 },
  { id: 3, division: 'RH', date: '2025-12-17', status: 'Planifiée', participants: 4, completed: 0 },
];

const calibrationDecisions = [
  { id: 1, name: 'Sophie Ekang', initial: 3.7, calibrated: 3.8, change: 0.1, justification: 'Résultats exceptionnels sur projet X' },
  { id: 2, name: 'Paul Oyono', initial: 3.5, calibrated: 3.5, change: 0, justification: 'Note maintenue - alignée avec pairs' },
  { id: 3, name: 'Thomas Ondo', initial: 4.2, calibrated: 3.9, change: -0.3, justification: 'Ajustement selon courbe de distribution' },
  { id: 4, name: 'Emma Bibang', initial: 2.8, calibrated: 3.0, change: 0.2, justification: 'Contexte difficile pris en compte' },
];

const targetDistribution = [
  { rating: '5 - Exceptionnel', target: '5-10%', current: 9, color: 'bg-primary' },
  { rating: '4 - Très bien', target: '20-30%', current: 27, color: 'bg-success' },
  { rating: '3 - Satisfaisant', target: '40-50%', current: 55, color: 'bg-info' },
  { rating: '2 - À améliorer', target: '10-20%', current: 8, color: 'bg-warning' },
  { rating: '1 - Insatisfaisant', target: '0-5%', current: 1, color: 'bg-destructive' },
];

export default function CalibrationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Calibration" 
        subtitle="Sessions d'harmonisation des notes par division"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Sessions planifiées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-success/10 p-3">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Collaborateurs à calibrer</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-warning/10 p-3">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Écarts à ajuster</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-info/10 p-3">
                  <CheckCircle2 className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0%</p>
                  <p className="text-xs text-muted-foreground">Calibration terminée</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Distribution Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Distribution des Notes
              </CardTitle>
              <CardDescription>
                Comparaison actuelle vs cibles de distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalibrationChart />
            </CardContent>
          </Card>

          {/* Target Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Cibles de Distribution</CardTitle>
              <CardDescription>Paramètres de calibration SOGARA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {targetDistribution.map((item, index) => (
                <div 
                  key={item.rating}
                  className={cn(
                    "animate-slide-up opacity-0",
                    `stagger-${index + 1}`
                  )}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.rating}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.target}</Badge>
                      <span className="text-sm font-bold">{item.current}%</span>
                    </div>
                  </div>
                  <Progress value={item.current} className={cn("h-2", `[&>div]:${item.color}`)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sessions */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Sessions de Calibration</CardTitle>
                <CardDescription>Liste SharePoint: Ivela_Calibration</CardDescription>
              </div>
              <Button>Planifier une session</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {calibrationSessions.map((session, index) => (
                <Card 
                  key={session.id}
                  className={cn(
                    "border-2 border-dashed animate-scale-in opacity-0",
                    `stagger-${index + 1}`
                  )}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge>{session.division}</Badge>
                        <Badge variant="outline">{session.status}</Badge>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{session.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {session.participants} participants
                        </p>
                      </div>
                      <Progress value={(session.completed / session.participants) * 100} className="h-2" />
                      <Button variant="outline" className="w-full">
                        Accéder à la session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Decisions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Décisions de Calibration</CardTitle>
            <CardDescription>Ajustements récents validés</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="up">Ajustés ↑</TabsTrigger>
                <TabsTrigger value="down">Ajustés ↓</TabsTrigger>
                <TabsTrigger value="same">Maintenus</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4 space-y-3">
                {calibrationDecisions.map((decision, index) => (
                  <div 
                    key={decision.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg bg-muted/50 animate-slide-up opacity-0",
                      `stagger-${index + 1}`
                    )}
                    style={{ animationFillMode: 'forwards' }}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {decision.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{decision.name}</p>
                      <p className="text-sm text-muted-foreground">{decision.justification}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Initial</p>
                        <p className="text-lg font-bold">{decision.initial}</p>
                      </div>
                      <div className="flex items-center justify-center w-8">
                        {decision.change > 0 ? (
                          <ArrowUpRight className="h-5 w-5 text-success" />
                        ) : decision.change < 0 ? (
                          <ArrowDownRight className="h-5 w-5 text-destructive" />
                        ) : (
                          <Minus className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Calibré</p>
                        <p className={cn(
                          "text-lg font-bold",
                          decision.change > 0 ? "text-success" :
                          decision.change < 0 ? "text-destructive" : "text-foreground"
                        )}>
                          {decision.calibrated}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
