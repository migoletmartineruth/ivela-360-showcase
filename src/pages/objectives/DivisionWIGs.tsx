import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Building2 } from 'lucide-react';
import { divisionWIGs, enterpriseWIGs } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function DivisionWIGsPage() {
  const getEnterpriseWIG = (id: string) => enterpriseWIGs.find(w => w.id === id);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="WIGs Division" 
        subtitle="Déclinaison des objectifs par division"
      />

      <div className="p-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-info/20 bg-info/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-info/10 p-3">
                <Building2 className="h-6 w-6 text-info" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Liste SharePoint: Ivela_DivisionWIGs</p>
                <p className="text-sm text-muted-foreground">
                  Chaque division décline les WIGs Entreprise en objectifs opérationnels mesurables
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter WIG Division
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {divisionWIGs.map((wig, index) => {
            const parentWIG = getEnterpriseWIG(wig.wigEntrepriseId);
            return (
              <Card 
                key={wig.id} 
                className={cn(
                  "shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Badge variant="outline" className="mb-2">{wig.division}</Badge>
                      <CardTitle className="text-lg">{wig.intitule}</CardTitle>
                      {parentWIG && (
                        <CardDescription className="text-xs">
                          ↳ WIG Entreprise: {parentWIG.wig}
                        </CardDescription>
                      )}
                    </div>
                    <span className={cn(
                      "text-2xl font-bold",
                      wig.progression >= 80 ? "text-success" :
                      wig.progression >= 50 ? "text-warning" : "text-destructive"
                    )}>
                      {wig.progression}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-medium">Cible: {wig.cible}</span>
                    </div>
                    <Progress 
                      value={wig.progression} 
                      className={cn(
                        "h-2",
                        wig.progression >= 80 ? "[&>div]:bg-success" :
                        wig.progression >= 50 ? "[&>div]:bg-warning" : "[&>div]:bg-destructive"
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Indicateur</p>
                      <p className="font-medium">{wig.indicateur}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Responsable N+2</p>
                      <p className="font-medium">{wig.n2}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Voir OKRs liés
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Modifier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
