import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText, CheckCircle2, Download, Eye } from 'lucide-react';
import { managerReviews, users } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ManagerReviewPage() {
  const getUser = (id: string) => users.find(u => u.id === id);

  const handleGeneratePDF = () => {
    toast.success('PDF généré', {
      description: 'Power Automate: Restitution PDF créée et envoyée par email'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Revue Manager" 
        subtitle="Synthèse finale par le N+1 avant calibration"
      />

      <div className="p-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-info/20 bg-info/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-info/10 p-3">
                <FileText className="h-6 w-6 text-info" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Liste SharePoint: Ivela_ManagerReview</p>
                <p className="text-sm text-muted-foreground">
                  Le manager consolide les évaluations 360° et propose une note finale avant calibration
                </p>
              </div>
              <Button className="gap-2" variant="outline">
                <FileText className="h-4 w-4" />
                Nouvelle Revue
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          {managerReviews.map((review, index) => {
            const collaborateur = getUser(review.collaborateurId);
            const manager = getUser(review.managerId);
            return (
              <Card 
                key={review.id}
                className={cn(
                  "shadow-card animate-slide-up opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {collaborateur?.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{collaborateur?.name}</CardTitle>
                        <CardDescription>
                          Revue par {manager?.name} • {review.dateRevue}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle2 className="h-3 w-3 text-success" />
                      {review.statut}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-primary/5 p-4 text-center">
                      <p className="text-3xl font-bold text-primary">{review.noteFinale}</p>
                      <p className="text-xs text-muted-foreground">Note Performance</p>
                    </div>
                    <div className="rounded-lg bg-success/5 p-4 text-center">
                      <p className="text-3xl font-bold text-success">{review.confianceFinale}</p>
                      <p className="text-xs text-muted-foreground">Note Confiance</p>
                    </div>
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <p className="text-sm font-medium">{review.pip ? 'Oui' : 'Non'}</p>
                      <p className="text-xs text-muted-foreground">Plan PIP requis</p>
                    </div>
                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-sm font-medium truncate" title={review.recommandation}>
                        {review.recommandation}
                      </p>
                      <p className="text-xs text-muted-foreground">Recommandation</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Voir évaluations 360°
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleGeneratePDF}>
                      <Download className="h-4 w-4" />
                      Générer PDF
                    </Button>
                    <Button size="sm" className="ml-auto">
                      Envoyer en calibration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Flow */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Flux Power Automate</CardTitle>
            <CardDescription>Automatisation de la Revue Manager</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4">
              {[
                { step: 1, label: 'Création item', desc: 'Formulaire soumis' },
                { step: 2, label: 'Notification N+2', desc: 'Email automatique' },
                { step: 3, label: 'Validation', desc: 'Approbation requise' },
                { step: 4, label: 'Génération PDF', desc: 'Word template' },
                { step: 5, label: 'Envoi collaborateur', desc: 'Email + pièce jointe' },
              ].map((item, idx) => (
                <div key={item.step} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[120px]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {item.step}
                    </div>
                    <p className="mt-2 text-sm font-medium text-center">{item.label}</p>
                    <p className="text-xs text-muted-foreground text-center">{item.desc}</p>
                  </div>
                  {idx < 4 && (
                    <div className="w-8 h-0.5 bg-border mx-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
