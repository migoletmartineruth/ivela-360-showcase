import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Target, CheckCircle2, Circle } from 'lucide-react';
import { teamOKRs, divisionWIGs } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function TeamOKRPage() {
  const getDivisionWIG = (id: string) => divisionWIGs.find(w => w.id === id);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="OKR Équipe" 
        subtitle="Objectifs et Résultats Clés par équipe"
      />

      <div className="p-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-success/20 bg-success/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-success/10 p-3">
                <Target className="h-6 w-6 text-success" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Liste SharePoint: Ivela_TeamOKR</p>
                <p className="text-sm text-muted-foreground">
                  Les managers N+1 définissent les OKRs de leur équipe alignés sur les WIGs Division
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvel OKR
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* OKRs List */}
        <div className="space-y-4">
          {teamOKRs.map((okr, index) => {
            const parentWIG = getDivisionWIG(okr.wigDivisionId);
            const keyResults = [okr.kr1, okr.kr2, okr.kr3, okr.kr4, okr.kr5].filter(Boolean);
            
            return (
              <Card 
                key={okr.id}
                className={cn(
                  "shadow-card animate-slide-up opacity-0",
                  `stagger-${index + 1}`
                )}
                style={{ animationFillMode: 'forwards' }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge>{okr.division}</Badge>
                        <Badge variant="outline">{okr.service}</Badge>
                      </div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        {okr.objectif}
                      </CardTitle>
                      {parentWIG && (
                        <CardDescription>
                          ↳ WIG Division: {parentWIG.intitule}
                        </CardDescription>
                      )}
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-3xl font-bold",
                        okr.progression >= 80 ? "text-success" :
                        okr.progression >= 50 ? "text-warning" : "text-destructive"
                      )}>
                        {okr.progression}%
                      </span>
                      <p className="text-xs text-muted-foreground">progression</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avancement global</span>
                      <span className="font-medium">Manager: {okr.n1}</span>
                    </div>
                    <Progress 
                      value={okr.progression}
                      className={cn(
                        "h-3",
                        okr.progression >= 80 ? "[&>div]:bg-success" :
                        okr.progression >= 50 ? "[&>div]:bg-warning" : "[&>div]:bg-destructive"
                      )}
                    />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="krs" className="border-none">
                      <AccordionTrigger className="py-2 text-sm font-medium">
                        Résultats Clés ({keyResults.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {keyResults.map((kr, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 rounded-lg bg-muted/50 p-3"
                            >
                              <div className="mt-0.5">
                                {idx < 2 ? (
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                ) : (
                                  <Circle className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">KR{idx + 1}</p>
                                <p className="text-sm text-muted-foreground">{kr}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {idx < 2 ? '100%' : idx === 2 ? '45%' : '0%'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="leads" className="border-none">
                      <AccordionTrigger className="py-2 text-sm font-medium">
                        Lead Measures
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          {okr.leadMeasures || 'Aucune mesure lead définie'}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      Objectifs Individuels
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Modifier OKR
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
