import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  UserX, 
  RefreshCw, 
  ArrowUpRight,
  Calendar,
  Plus,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

const pipCases = [
  { id: 1, name: 'François Nze', service: 'Qualité', startDate: '2025-09-01', endDate: '2025-12-31', progress: 35, status: 'En cours' },
  { id: 2, name: 'Hélène Ella', service: 'Formation', startDate: '2025-10-15', endDate: '2026-01-15', progress: 20, status: 'En cours' },
];

const specialCases = [
  { id: 1, name: 'Emma Bibang', service: 'Trésorerie', type: 'Congé maternité', startDate: '2025-06-01', endDate: '2025-09-30', impact: 'Évaluation ajustée' },
  { id: 2, name: 'Michel Assoumou', service: 'Maintenance', type: 'Mutation', startDate: '2025-08-01', endDate: null, impact: 'Changement de périmètre' },
  { id: 3, name: 'Thomas Ondo', service: 'Logistique', type: 'Formation longue', startDate: '2025-05-01', endDate: '2025-07-31', impact: 'Objectifs réduits' },
];

export default function SpecialCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Cas Particuliers" 
        subtitle="Plans PIP et situations exceptionnelles"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-card border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-destructive/10 p-3">
                  <UserX className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pipCases.length}</p>
                  <p className="text-xs text-muted-foreground">Plans PIP actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card border-warning/20 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-warning/10 p-3">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{specialCases.length}</p>
                  <p className="text-xs text-muted-foreground">Cas particuliers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-success/10 p-3">
                  <RefreshCw className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Résolus ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pip" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pip" className="gap-2">
              <UserX className="h-4 w-4" />
              Plans PIP
            </TabsTrigger>
            <TabsTrigger value="special" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Cas Particuliers
            </TabsTrigger>
          </TabsList>

          {/* PIP */}
          <TabsContent value="pip" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Plans d'Amélioration de la Performance</h2>
                <p className="text-sm text-muted-foreground">Liste SharePoint: Ivela_PIP</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouveau PIP
              </Button>
            </div>

            <div className="space-y-4">
              {pipCases.map((pip, index) => (
                <Card 
                  key={pip.id}
                  className={cn(
                    "shadow-card border-l-4 border-l-destructive animate-slide-up opacity-0",
                    `stagger-${index + 1}`
                  )}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-destructive/10 text-destructive">
                          {pip.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{pip.name}</h3>
                          <Badge variant="destructive">{pip.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{pip.service}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {pip.startDate} → {pip.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="w-48 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium">{pip.progress}%</span>
                        </div>
                        <Progress value={pip.progress} className="[&>div]:bg-destructive" />
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-4 w-4" />
                        Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Special Cases */}
          <TabsContent value="special" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Situations Exceptionnelles</h2>
                <p className="text-sm text-muted-foreground">Liste SharePoint: Ivela_CasParticuliers</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Déclarer un cas
              </Button>
            </div>

            <div className="space-y-4">
              {specialCases.map((cas, index) => (
                <Card 
                  key={cas.id}
                  className={cn(
                    "shadow-card border-l-4 border-l-warning animate-slide-up opacity-0",
                    `stagger-${index + 1}`
                  )}
                  style={{ animationFillMode: 'forwards' }}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-warning/10 text-warning">
                          {cas.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{cas.name}</h3>
                          <Badge variant="outline">{cas.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{cas.service}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {cas.startDate} {cas.endDate ? `→ ${cas.endDate}` : '(en cours)'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Impact</p>
                        <p className="text-sm text-muted-foreground">{cas.impact}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <ArrowUpRight className="h-4 w-4" />
                        Gérer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
