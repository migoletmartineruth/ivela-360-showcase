import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, User, CheckCircle2, Clock, FileText, Edit } from 'lucide-react';
import { individualGoals } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusConfig = {
  'Brouillon': { className: 'status-draft', icon: FileText },
  'Soumis': { className: 'status-pending', icon: Clock },
  'Validé': { className: 'status-completed', icon: CheckCircle2 },
  'En cours': { className: 'status-active', icon: Clock },
  'Terminé': { className: 'status-completed', icon: CheckCircle2 },
};

export default function IndividualGoalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Objectifs Individuels" 
        subtitle="What (Objectifs) • How (ABCD Comportements) • Grow (PDI)"
      />

      <div className="p-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-warning/20 bg-warning/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-warning/10 p-3">
                <User className="h-6 w-6 text-warning" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Liste SharePoint: Ivela_IndividualGoals</p>
                <p className="text-sm text-muted-foreground">
                  Structure What-How-Grow pour définir les objectifs, comportements et plan de développement
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvel Objectif
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table View */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Objectifs Individuels 2025</CardTitle>
            <CardDescription>Vue consolidée des objectifs par collaborateur</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="validated">Validés</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Collaborateur</TableHead>
                      <TableHead>Division / Service</TableHead>
                      <TableHead>What (Objectifs)</TableHead>
                      <TableHead className="text-center">Poids</TableHead>
                      <TableHead>How (ABCD)</TableHead>
                      <TableHead className="text-center">Poids</TableHead>
                      <TableHead>Grow (PDI)</TableHead>
                      <TableHead className="text-center">Poids</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {individualGoals.map((goal) => {
                      const status = statusConfig[goal.statut];
                      const StatusIcon = status.icon;
                      return (
                        <TableRow key={goal.id} className="animate-fade-in">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {goal.collaborateur.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{goal.collaborateur}</p>
                                <p className="text-xs text-muted-foreground">{goal.matricule}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{goal.division}</p>
                            <p className="text-xs text-muted-foreground">{goal.service}</p>
                          </TableCell>
                          <TableCell className="max-w-[150px]">
                            <p className="text-sm truncate" title={goal.whatObjectifs}>
                              {goal.whatObjectifs}
                            </p>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{goal.whatPoids}%</Badge>
                          </TableCell>
                          <TableCell className="max-w-[120px]">
                            <p className="text-sm truncate" title={goal.howABCD}>
                              {goal.howABCD}
                            </p>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{goal.howPoids}%</Badge>
                          </TableCell>
                          <TableCell className="max-w-[120px]">
                            <p className="text-sm truncate" title={goal.growPDI}>
                              {goal.growPDI}
                            </p>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{goal.growPoids}%</Badge>
                          </TableCell>
                          <TableCell>
                            <span className={cn("status-badge gap-1", status.className)}>
                              <StatusIcon className="h-3 w-3" />
                              {goal.statut}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="pending" className="pt-4">
                <div className="text-center py-8 text-muted-foreground">
                  Aucun objectif en attente de validation
                </div>
              </TabsContent>
              <TabsContent value="validated" className="pt-4">
                <div className="text-center py-8 text-muted-foreground">
                  Affichage des objectifs validés
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Weight Distribution */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">What (Objectifs)</CardTitle>
              <CardDescription>Répartition moyenne du poids</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">47%</div>
              <p className="text-xs text-muted-foreground">Cible: 40-60%</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">How (Comportements ABCD)</CardTitle>
              <CardDescription>Répartition moyenne du poids</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">32%</div>
              <p className="text-xs text-muted-foreground">Cible: 25-40%</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Grow (PDI)</CardTitle>
              <CardDescription>Répartition moyenne du poids</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">21%</div>
              <p className="text-xs text-muted-foreground">Cible: 15-25%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
