import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CalibrationChart } from '@/components/dashboard/CalibrationChart';
import { NineBoxGrid } from '@/components/dashboard/NineBoxGrid';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  AlertTriangle,
  Download,
  ExternalLink,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { nineBoxEmployees, divisions } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart as RechartsPie, Pie, Cell } from 'recharts';
import { cn } from '@/lib/utils';

const divisionData = [
  { name: 'Production', objectifs: 45, evaluations: 38, calibration: 0 },
  { name: 'Finance', objectifs: 28, evaluations: 22, calibration: 0 },
  { name: 'RH', objectifs: 18, evaluations: 15, calibration: 0 },
  { name: 'IT', objectifs: 32, evaluations: 28, calibration: 0 },
  { name: 'Commercial', objectifs: 22, evaluations: 18, calibration: 0 },
  { name: 'Logistique', objectifs: 11, evaluations: 8, calibration: 0 },
];

const trendData = [
  { month: 'Jan', objectifs: 20, evaluations: 0 },
  { month: 'Fév', objectifs: 65, evaluations: 0 },
  { month: 'Mar', objectifs: 120, evaluations: 0 },
  { month: 'Avr', objectifs: 142, evaluations: 0 },
  { month: 'Mai', objectifs: 142, evaluations: 15 },
  { month: 'Jun', objectifs: 142, evaluations: 89 },
  { month: 'Jul', objectifs: 142, evaluations: 89 },
];

const qualityData = [
  { name: 'Complets', value: 85, color: 'hsl(var(--success))' },
  { name: 'Partiels', value: 12, color: 'hsl(var(--warning))' },
  { name: 'Vides', value: 3, color: 'hsl(var(--destructive))' },
];

const daxMeasures = [
  { name: 'Perf_Final', formula: 'AVERAGE(Ivela_ManagerReview[noteFinale])', description: 'Moyenne des notes finales de performance' },
  { name: 'Confiance_Final', formula: 'AVERAGE(Ivela_ManagerReview[confianceFinale])', description: 'Moyenne des notes de confiance' },
  { name: 'ABCD_Moyenne', formula: 'AVERAGE(MidYear360[A] + [B] + [C] + [D]) / 4', description: 'Score moyen comportements ABCD' },
  { name: 'Quadrant_9Box', formula: 'SWITCH(TRUE(), Perf >= 4 && Conf >= 4, "Star", ...)', description: 'Calcul du quadrant 9-Box' },
  { name: 'Taux_Completion', formula: 'DIVIDE(COUNT(Objectifs), COUNT(Collaborateurs))', description: 'Pourcentage d\'objectifs définis' },
  { name: 'Ecart_Distribution', formula: 'ABS(Actual% - Target%)', description: 'Écart avec cible de distribution' },
];

export default function PowerBIPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Power BI Dashboard" 
        subtitle="Tableaux de bord et indicateurs de pilotage"
      />

      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <Card className="shadow-card">
          <CardContent className="py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  Dernière actualisation: Aujourd'hui 09:15
                </Badge>
                <Badge variant="outline">Cycle 2025</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Actualiser
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exporter
                </Button>
                <Button size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Ouvrir Power BI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="objectives">Suivi Objectifs</TabsTrigger>
            <TabsTrigger value="calibration">Calibration</TabsTrigger>
            <TabsTrigger value="quality">Qualité Données</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="shadow-card">
                <CardContent className="pt-6 flex items-center justify-center">
                  <ProgressRing value={91} label="Objectifs" sublabel="définis" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6 flex items-center justify-center">
                  <ProgressRing value={57} label="Évaluations" sublabel="complétées" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6 flex items-center justify-center">
                  <ProgressRing value={0} label="Calibration" sublabel="terminée" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="pt-6 flex items-center justify-center">
                  <ProgressRing value={85} label="Qualité" sublabel="données" />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Avancement par Division
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={divisionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="objectifs" fill="hsl(var(--primary))" name="Objectifs" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="evaluations" fill="hsl(var(--success))" name="Évaluations" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Évolution Mensuelle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="objectifs" stroke="hsl(var(--primary))" strokeWidth={2} name="Objectifs" />
                        <Line type="monotone" dataKey="evaluations" stroke="hsl(var(--success))" strokeWidth={2} name="Évaluations" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Objectives */}
          <TabsContent value="objectives" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {divisions.slice(0, 6).map((div, index) => (
                <Card key={div} className={cn("shadow-card animate-slide-up opacity-0", `stagger-${index + 1}`)} style={{ animationFillMode: 'forwards' }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{div}</CardTitle>
                      <Badge variant="outline">
                        {divisionData[index]?.objectifs || 0} obj.
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="font-medium">{Math.round((divisionData[index]?.evaluations / divisionData[index]?.objectifs) * 100) || 0}%</span>
                      </div>
                      <Progress value={(divisionData[index]?.evaluations / divisionData[index]?.objectifs) * 100} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calibration */}
          <TabsContent value="calibration" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Distribution des Notes</CardTitle>
                  <CardDescription>Actuel vs Cibles</CardDescription>
                </CardHeader>
                <CardContent>
                  <CalibrationChart />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base">Matrice 9-Box</CardTitle>
                  <CardDescription>Performance × Confiance</CardDescription>
                </CardHeader>
                <CardContent>
                  <NineBoxGrid employees={nineBoxEmployees} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quality */}
          <TabsContent value="quality" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-primary" />
                    Complétude des Données
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie
                          data={qualityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {qualityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Alertes Qualité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: '5 objectifs sans poids défini', type: 'warning' },
                    { label: '3 collaborateurs sans manager assigné', type: 'error' },
                    { label: '12 évaluations partiellement remplies', type: 'warning' },
                    { label: '2 doublons détectés dans IndividualGoals', type: 'info' },
                  ].map((alert, idx) => (
                    <div key={idx} className={cn(
                      "flex items-center gap-3 p-3 rounded-lg",
                      alert.type === 'error' ? "bg-destructive/10" :
                      alert.type === 'warning' ? "bg-warning/10" : "bg-info/10"
                    )}>
                      <AlertTriangle className={cn(
                        "h-4 w-4",
                        alert.type === 'error' ? "text-destructive" :
                        alert.type === 'warning' ? "text-warning" : "text-info"
                      )} />
                      <span className="text-sm">{alert.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* DAX Measures */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Mesures DAX</CardTitle>
            <CardDescription>Formules clés utilisées dans le modèle Power BI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {daxMeasures.map((measure, index) => (
                <div 
                  key={measure.name}
                  className={cn(
                    "p-4 rounded-lg bg-muted/50 animate-slide-up opacity-0",
                    `stagger-${index + 1}`
                  )}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <p className="font-mono text-sm font-semibold text-primary">{measure.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{measure.formula}</p>
                  <p className="text-xs text-muted-foreground mt-2">{measure.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
