import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, 
  Mail, 
  FileText, 
  Clock, 
  Lock, 
  Bell,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '@/lib/utils';

const flows = [
  {
    id: 1,
    name: 'Soumission → Création Item',
    description: 'Crée automatiquement un enregistrement dans la liste SharePoint correspondante',
    trigger: 'Soumission MS Forms',
    actions: ['Créer item SharePoint', 'Email confirmation'],
    status: 'active',
    runs: 342,
    type: 'submission'
  },
  {
    id: 2,
    name: 'Notifications N+1',
    description: 'Notifie le manager quand un collaborateur soumet ses objectifs ou évaluation',
    trigger: 'Nouvel item créé',
    actions: ['Récupérer N+1', 'Envoyer email', 'Créer tâche Planner'],
    status: 'active',
    runs: 256,
    type: 'notification'
  },
  {
    id: 3,
    name: 'Verrouillage Automatique',
    description: 'Verrouille les formulaires après la date limite',
    trigger: 'Planifié quotidien',
    actions: ['Vérifier dates', 'Mettre à jour statut', 'Notifier si verrouillé'],
    status: 'active',
    runs: 45,
    type: 'lock'
  },
  {
    id: 4,
    name: 'Relances Hebdomadaires',
    description: 'Envoie des rappels pour les formulaires non soumis',
    trigger: 'Planifié lundi 9h',
    actions: ['Identifier retardataires', 'Email collaborateur', 'Email N+1'],
    status: 'active',
    runs: 12,
    type: 'reminder'
  },
  {
    id: 5,
    name: 'Génération PDF Restitution',
    description: 'Génère un PDF de synthèse à partir du template Word',
    trigger: 'Item Ivela_ManagerReview créé',
    actions: ['Récupérer données', 'Remplir template Word', 'Convertir PDF', 'Envoyer email'],
    status: 'active',
    runs: 89,
    type: 'pdf'
  },
  {
    id: 6,
    name: 'Approbation Calibration',
    description: 'Workflow d\'approbation pour les décisions de calibration',
    trigger: 'Soumission calibration',
    actions: ['Envoyer approbation N+2', 'Attendre validation', 'Mettre à jour statut'],
    status: 'paused',
    runs: 0,
    type: 'approval'
  },
];

const flowTypeConfig = {
  submission: { icon: FileText, color: 'primary' },
  notification: { icon: Bell, color: 'info' },
  lock: { icon: Lock, color: 'warning' },
  reminder: { icon: Clock, color: 'success' },
  pdf: { icon: FileText, color: 'accent' },
  approval: { icon: CheckCircle2, color: 'muted' },
};

export default function PowerAutomatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Power Automate" 
        subtitle="Flux d'automatisation IVELA 360°"
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-success/10 p-3">
                  <Play className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">Flux actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-warning/10 p-3">
                  <Pause className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">En pause</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">744</p>
                  <p className="text-xs text-muted-foreground">Exécutions totales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-info/10 p-3">
                  <Mail className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,240</p>
                  <p className="text-xs text-muted-foreground">Emails envoyés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flows List */}
        <div className="space-y-4">
          {flows.map((flow, index) => {
            const typeConfig = flowTypeConfig[flow.type as keyof typeof flowTypeConfig];
            const Icon = typeConfig.icon;
            return (
              <Card 
                key={flow.id}
                className={cn(
                  "shadow-card animate-slide-up opacity-0",
                  flow.status === 'paused' && "opacity-60",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "rounded-lg p-3 bg-primary/10"
                    )}>
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{flow.name}</h3>
                        <Badge variant={flow.status === 'active' ? 'default' : 'secondary'}>
                          {flow.status === 'active' ? 'Actif' : 'En pause'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{flow.description}</p>
                      
                      {/* Flow Steps */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {flow.trigger}
                        </Badge>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        {flow.actions.map((action, idx) => (
                          <span key={idx} className="flex items-center">
                            <Badge variant="outline" className="text-xs bg-muted">
                              {action}
                            </Badge>
                            {idx < flow.actions.length - 1 && (
                              <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold">{flow.runs}</p>
                        <p className="text-xs text-muted-foreground">exécutions</p>
                      </div>
                      <Switch checked={flow.status === 'active'} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Flow Template */}
        <Card className="shadow-card border-dashed border-2">
          <CardHeader>
            <CardTitle className="text-base">Créer un nouveau flux</CardTitle>
            <CardDescription>
              Utilisez les modèles Power Automate pour ajouter de nouvelles automatisations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Flux de soumission
              </Button>
              <Button variant="outline" className="gap-2">
                <Bell className="h-4 w-4" />
                Flux de notification
              </Button>
              <Button variant="outline" className="gap-2">
                <Clock className="h-4 w-4" />
                Flux planifié
              </Button>
              <Button variant="outline" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Flux d'approbation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
