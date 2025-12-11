import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NineBoxGrid } from '@/components/dashboard/NineBoxGrid';
import { Grid3X3, Filter, Download, Users } from 'lucide-react';
import { nineBoxEmployees, divisions } from '@/data/mockData';
import { cn } from '@/lib/utils';

const boxDescriptions = {
  'Stars': { 
    desc: 'Haute performance + Haute confiance. À développer et retenir en priorité.',
    actions: ['Plan de succession', 'Projets stratégiques', 'Mentoring senior']
  },
  'Futurs Leaders': { 
    desc: 'Performance moyenne + Haute confiance. Fort potentiel à développer.',
    actions: ['Formation leadership', 'Exposition transverse', 'Coaching']
  },
  'Potentiels Émergents': { 
    desc: 'Performance faible + Haute confiance. Besoin de montée en compétences.',
    actions: ['Plan de développement', 'Accompagnement renforcé', 'Objectifs intermédiaires']
  },
  'Experts Techniques': { 
    desc: 'Haute performance + Confiance moyenne. Contributeurs clés à stabiliser.',
    actions: ['Reconnaissance expertise', 'Partage de connaissances', 'Développement soft skills']
  },
  'Cœur de l\'Équipe': { 
    desc: 'Performance moyenne + Confiance moyenne. Base solide de l\'organisation.',
    actions: ['Objectifs clairs', 'Feedback régulier', 'Opportunités de progression']
  },
  'Performeurs en Développement': { 
    desc: 'Performance faible + Confiance moyenne. À accompagner vers la performance.',
    actions: ['Plan d\'amélioration', 'Formation ciblée', 'Suivi rapproché']
  },
  'Talents Cachés': { 
    desc: 'Haute performance + Faible confiance. Potentiel sous-exploité.',
    actions: ['Comprendre les freins', 'Projets de visibilité', 'Dialogue ouvert']
  },
  'Contributeurs Stables': { 
    desc: 'Performance moyenne + Faible confiance. Maintien du niveau actuel.',
    actions: ['Clarification des attentes', 'Soutien opérationnel', 'Évaluation continue']
  },
  'À Réorienter': { 
    desc: 'Performance faible + Faible confiance. Action urgente requise.',
    actions: ['Plan PIP', 'Repositionnement', 'Décision RH']
  },
};

export default function NineBoxPage() {
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const filteredEmployees = selectedDivision === 'all' 
    ? nineBoxEmployees 
    : nineBoxEmployees.filter(e => e.division === selectedDivision);

  const getBoxName = (perf: number, conf: number) => {
    const labels = [
      ['Talents Cachés', 'Potentiels Émergents', 'Stars'],
      ['Contributeurs Stables', 'Cœur de l\'Équipe', 'Futurs Leaders'],
      ['À Réorienter', 'Performeurs en Développement', 'Experts Techniques'],
    ];
    return labels[3 - conf][perf - 1];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Matrice 9-Box" 
        subtitle="Performance × Confiance - Cartographie des talents"
      />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card className="shadow-card">
          <CardContent className="py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filtres:</span>
                </div>
                <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les divisions</SelectItem>
                    {divisions.map(div => (
                      <SelectItem key={div} value={div}>{div}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Users className="h-3 w-3" />
                  {filteredEmployees.length} collaborateurs
                </Badge>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 9-Box Grid */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid3X3 className="h-5 w-5 text-primary" />
                  Matrice 9-Box
                </CardTitle>
                <CardDescription>
                  Cliquez sur une cellule pour voir les détails et actions recommandées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NineBoxGrid 
                  employees={filteredEmployees}
                  onCellClick={(pos) => setSelectedCell(getBoxName(pos.performance, pos.confiance))}
                />
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div className="space-y-4">
            {selectedCell && boxDescriptions[selectedCell as keyof typeof boxDescriptions] ? (
              <Card className="shadow-card border-primary/20 animate-scale-in">
                <CardHeader className="pb-2">
                  <Badge className="w-fit mb-2">{selectedCell}</Badge>
                  <CardDescription>
                    {boxDescriptions[selectedCell as keyof typeof boxDescriptions].desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Actions recommandées:</p>
                    <ul className="space-y-2">
                      {boxDescriptions[selectedCell as keyof typeof boxDescriptions].actions.map((action, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Collaborateurs dans cette catégorie:</p>
                    <div className="space-y-2">
                      {filteredEmployees
                        .filter(e => getBoxName(e.position.performance, e.position.confiance) === selectedCell)
                        .map(emp => (
                          <div key={emp.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {emp.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{emp.name}</p>
                              <p className="text-xs text-muted-foreground">{emp.service}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Grid3X3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Cliquez sur une cellule de la matrice pour voir les détails</p>
                </CardContent>
              </Card>
            )}

            {/* Legend */}
            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Légende</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded nine-box-star" />
                  <span className="text-sm">Stars / Futurs Leaders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded nine-box-growth" />
                  <span className="text-sm">Potentiels à développer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded nine-box-solid" />
                  <span className="text-sm">Contributeurs stables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded nine-box-risk" />
                  <span className="text-sm">Action requise</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
