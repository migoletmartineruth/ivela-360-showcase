import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { NineBoxGrid } from '@/components/dashboard/NineBoxGrid';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { CalibrationChart } from '@/components/dashboard/CalibrationChart';
import { ObjectivesProgress } from '@/components/dashboard/ObjectivesProgress';
import { RoleBadge } from '@/components/ui/role-badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Target, 
  ClipboardCheck, 
  AlertTriangle,
  ArrowRight,
  Calendar,
  TrendingUp,
  FileText
} from 'lucide-react';
import { dashboardStats, nineBoxEmployees, currentUser } from '@/data/mockData';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Tableau de bord IVELA 360°" 
        subtitle="Cycle de performance 2025"
      />

      <div className="p-6 space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-xl gradient-header p-6 text-white animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">Bienvenue, {currentUser.name.split(' ')[0]}</h2>
                <RoleBadge role={currentUser.role} className="bg-white/20 text-white border-white/30" />
              </div>
              <p className="text-white/80 max-w-xl">
                Cycle de performance 2025 en cours. Suivez les objectifs, évaluations 360° et la calibration de votre organisation.
              </p>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" size="sm" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Prochaine échéance: 15 Dec
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 gap-2">
                  Voir le calendrier <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ProgressRing 
              value={dashboardStats.tauxCompletion} 
              size={100}
              strokeWidth={8}
              label="Complété"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Collaborateurs"
            value={dashboardStats.totalCollaborateurs}
            subtitle="Total dans le périmètre"
            icon={Users}
            variant="primary"
            trend={{ value: 5, label: 'vs année précédente', positive: true }}
          />
          <StatsCard
            title="Objectifs Définis"
            value={dashboardStats.objectifsDefinis}
            subtitle={`sur ${dashboardStats.totalCollaborateurs} collaborateurs`}
            icon={Target}
            variant="success"
            trend={{ value: 91, label: 'taux de couverture', positive: true }}
          />
          <StatsCard
            title="Évaluations 360°"
            value={dashboardStats.evaluationsCompletes}
            subtitle="Mi-parcours complétées"
            icon={ClipboardCheck}
            variant="warning"
          />
          <StatsCard
            title="Alertes"
            value={dashboardStats.alertes}
            subtitle="Actions requises"
            icon={AlertTriangle}
            variant="danger"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - 9-Box & Calibration */}
          <div className="lg:col-span-2 space-y-6">
            {/* 9-Box Matrix */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Matrice 9-Box Performance × Confiance
                  </CardTitle>
                  <CardDescription>
                    Positionnement des collaborateurs selon leur performance et niveau de confiance
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
              </CardHeader>
              <CardContent>
                <NineBoxGrid employees={nineBoxEmployees} />
              </CardContent>
            </Card>

            {/* Calibration */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Distribution des Notes - Calibration
                </CardTitle>
                <CardDescription>
                  Comparaison entre les notes actuelles et les cibles de distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalibrationChart />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Progress */}
          <div className="space-y-6">
            {/* Objectives Progress */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Avancement des Objectifs</CardTitle>
                <CardDescription>WIGs Division - Progression</CardDescription>
              </CardHeader>
              <CardContent>
                <ObjectivesProgress />
              </CardContent>
            </Card>

            {/* Activity Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Activité Récente</CardTitle>
                <CardDescription>Dernières actions du système</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityTimeline />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Role-Based Quick Actions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Actions Rapides</CardTitle>
            <CardDescription>Accès direct aux fonctionnalités selon votre rôle</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="drh">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="collaborateur">Collaborateur</TabsTrigger>
                <TabsTrigger value="n1">Manager N+1</TabsTrigger>
                <TabsTrigger value="n2">Chef Division N+2</TabsTrigger>
                <TabsTrigger value="drh">DRH / Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="collaborateur" className="pt-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    <span>Mes Objectifs</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <ClipboardCheck className="h-6 w-6 text-success" />
                    <span>Auto-évaluation 360°</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <FileText className="h-6 w-6 text-info" />
                    <span>Mon PDI</span>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="n1" className="pt-4">
                <div className="grid gap-3 md:grid-cols-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    <span>Mon Équipe</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Target className="h-6 w-6 text-success" />
                    <span>Valider Objectifs</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <ClipboardCheck className="h-6 w-6 text-warning" />
                    <span>Évaluations 360°</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <FileText className="h-6 w-6 text-info" />
                    <span>Revue Manager</span>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="n2" className="pt-4">
                <div className="grid gap-3 md:grid-cols-4">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    <span>WIGs Division</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Users className="h-6 w-6 text-success" />
                    <span>Calibration</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <TrendingUp className="h-6 w-6 text-warning" />
                    <span>Matrice 9-Box</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    <span>Plans PIP</span>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="drh" className="pt-4">
                <div className="grid gap-3 md:grid-cols-5">
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    <span>WIGs Entreprise</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <Users className="h-6 w-6 text-success" />
                    <span>Calibration Globale</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <TrendingUp className="h-6 w-6 text-warning" />
                    <span>Power BI Reports</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <FileText className="h-6 w-6 text-info" />
                    <span>Listes SharePoint</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    <span>Cas Particuliers</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
