import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  FileText, 
  Users, 
  Target, 
  ClipboardCheck, 
  BarChart3,
  AlertTriangle,
  ExternalLink,
  Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sharePointLists = [
  { 
    name: 'Ivela_EnterpriseWIGs', 
    description: 'Objectifs stratégiques de l\'entreprise',
    icon: Target,
    records: 3,
    columns: 6,
    phase: 1,
    color: 'primary'
  },
  { 
    name: 'Ivela_DivisionWIGs', 
    description: 'Déclinaison des WIGs par division',
    icon: Target,
    records: 4,
    columns: 8,
    phase: 1,
    color: 'info'
  },
  { 
    name: 'Ivela_TeamOKR', 
    description: 'OKRs des équipes avec KRs et Lead Measures',
    icon: Target,
    records: 2,
    columns: 12,
    phase: 1,
    color: 'success'
  },
  { 
    name: 'Ivela_IndividualGoals', 
    description: 'Objectifs individuels What-How-Grow',
    icon: Users,
    records: 156,
    columns: 15,
    phase: 1,
    color: 'warning'
  },
  { 
    name: 'Ivela_MidYear360', 
    description: 'Évaluations 360° mi-parcours',
    icon: ClipboardCheck,
    records: 307,
    columns: 10,
    phase: 2,
    color: 'primary'
  },
  { 
    name: 'Ivela_EndYear360', 
    description: 'Évaluations 360° fin d\'année',
    icon: ClipboardCheck,
    records: 0,
    columns: 10,
    phase: 2,
    color: 'info'
  },
  { 
    name: 'Ivela_ManagerReview', 
    description: 'Revues managers avant calibration',
    icon: FileText,
    records: 89,
    columns: 8,
    phase: 2,
    color: 'success'
  },
  { 
    name: 'Ivela_Calibration', 
    description: 'Sessions et décisions de calibration',
    icon: BarChart3,
    records: 3,
    columns: 7,
    phase: 2,
    color: 'warning'
  },
  { 
    name: 'Ivela_PIP', 
    description: 'Plans d\'Amélioration de la Performance',
    icon: AlertTriangle,
    records: 5,
    columns: 8,
    phase: 2,
    color: 'destructive'
  },
  { 
    name: 'Ivela_CasParticuliers', 
    description: 'Situations exceptionnelles (congés, mutations...)',
    icon: AlertTriangle,
    records: 8,
    columns: 7,
    phase: 2,
    color: 'muted'
  },
];

const colorVariants: Record<string, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  info: 'bg-info/10 text-info border-info/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  muted: 'bg-muted text-muted-foreground border-border',
};

export default function SharePointListsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Listes SharePoint" 
        subtitle="Structure de données IVELA 360° sur le site SharePoint dédié"
      />

      <div className="p-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Site SharePoint: IVELA 360°</p>
                <p className="text-sm text-muted-foreground">
                  10 listes principales pour stocker toutes les données du cycle de performance
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Ouvrir SharePoint
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Phase 1 Lists */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Badge>Phase 1</Badge>
            Listes principales (J1-J2)
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {sharePointLists.filter(l => l.phase === 1).map((list, index) => (
              <Card 
                key={list.name}
                className={cn(
                  "shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer animate-slide-up opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className={cn(
                      "rounded-lg p-2 border",
                      colorVariants[list.color]
                    )}>
                      <list.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline">{list.records} items</Badge>
                  </div>
                  <CardTitle className="text-base mt-2">{list.name}</CardTitle>
                  <CardDescription>{list.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{list.columns} colonnes</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Table className="h-4 w-4" />
                      Voir structure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Phase 2 Lists */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Badge variant="outline">Phase 2</Badge>
            Listes secondaires (48h après)
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sharePointLists.filter(l => l.phase === 2).map((list, index) => (
              <Card 
                key={list.name}
                className={cn(
                  "shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer animate-slide-up opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className={cn(
                      "rounded-lg p-2 border",
                      colorVariants[list.color]
                    )}>
                      <list.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline">{list.records} items</Badge>
                  </div>
                  <CardTitle className="text-sm mt-2">{list.name}</CardTitle>
                  <CardDescription className="text-xs">{list.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{list.columns} colonnes</span>
                    <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
                      <Table className="h-3 w-3" />
                      Voir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Permissions par Rôle</CardTitle>
            <CardDescription>Configuration des droits d'accès SharePoint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Liste</th>
                    <th className="text-center py-3 px-4 font-medium">Collaborateur</th>
                    <th className="text-center py-3 px-4 font-medium">N+1</th>
                    <th className="text-center py-3 px-4 font-medium">N+2</th>
                    <th className="text-center py-3 px-4 font-medium">DRH</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'EnterpriseWIGs', collab: 'Lecture', n1: 'Lecture', n2: 'Lecture', drh: 'Contrôle total' },
                    { name: 'DivisionWIGs', collab: 'Lecture', n1: 'Lecture', n2: 'Édition', drh: 'Contrôle total' },
                    { name: 'TeamOKR', collab: 'Lecture', n1: 'Édition', n2: 'Lecture', drh: 'Contrôle total' },
                    { name: 'IndividualGoals', collab: 'Édition (propres)', n1: 'Édition (équipe)', n2: 'Lecture', drh: 'Contrôle total' },
                    { name: 'MidYear360', collab: 'Édition (propres)', n1: 'Édition', n2: 'Lecture', drh: 'Contrôle total' },
                    { name: 'Calibration', collab: '-', n1: 'Lecture', n2: 'Édition', drh: 'Contrôle total' },
                  ].map((row) => (
                    <tr key={row.name} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">Ivela_{row.name}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline" className="text-xs">{row.collab}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline" className="text-xs">{row.n1}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline" className="text-xs">{row.n2}</Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className="text-xs">{row.drh}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
