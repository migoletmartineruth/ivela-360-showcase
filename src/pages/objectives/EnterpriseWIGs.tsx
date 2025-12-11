import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2, CheckCircle2, Clock, FileText } from 'lucide-react';
import { enterpriseWIGs } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const statusConfig = {
  'Brouillon': { className: 'status-draft', icon: FileText },
  'Validé': { className: 'status-completed', icon: CheckCircle2 },
  'En cours': { className: 'status-active', icon: Clock },
  'Terminé': { className: 'status-completed', icon: CheckCircle2 },
};

export default function EnterpriseWIGsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = () => {
    toast.success('WIG Entreprise créé avec succès', {
      description: 'Le formulaire a été enregistré dans la liste SharePoint Ivela_EnterpriseWIGs'
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="WIGs Entreprise" 
        subtitle="Objectifs stratégiques de l'organisation"
      />

      <div className="p-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Liste SharePoint: Ivela_EnterpriseWIGs</p>
                <p className="text-sm text-muted-foreground">
                  Les WIGs (Wildly Important Goals) définissent les priorités stratégiques de SOGARA pour 2025
                </p>
              </div>
              <Badge variant="outline" className="text-primary border-primary">
                {enterpriseWIGs.length} WIGs
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Input placeholder="Rechercher un WIG..." className="w-64" />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouveau WIG
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Créer un WIG Entreprise</DialogTitle>
                <DialogDescription>
                  Ce formulaire simule MS Forms → Ivela_EnterpriseWIGs
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="annee">Année</Label>
                  <Input id="annee" type="number" defaultValue={2025} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wig">Intitulé du WIG</Label>
                  <Input id="wig" placeholder="Objectif stratégique majeur..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Décrivez l'objectif en détail..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proprietaire">Propriétaire</Label>
                  <Input id="proprietaire" placeholder="Nom du responsable..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateValidation">Date de validation</Label>
                  <Input id="dateValidation" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit}>
                  Soumettre (Power Automate)
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>WIGs Entreprise 2025</CardTitle>
            <CardDescription>Liste des objectifs stratégiques validés</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Année</TableHead>
                  <TableHead>WIG</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Propriétaire</TableHead>
                  <TableHead>Date Validation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enterpriseWIGs.map((wig) => {
                  const status = statusConfig[wig.statut];
                  const StatusIcon = status.icon;
                  return (
                    <TableRow key={wig.id} className="animate-fade-in">
                      <TableCell className="font-medium">{wig.annee}</TableCell>
                      <TableCell className="max-w-[200px] truncate font-medium">
                        {wig.wig}
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate text-muted-foreground">
                        {wig.description}
                      </TableCell>
                      <TableCell>{wig.proprietaire}</TableCell>
                      <TableCell>{wig.dateValidation}</TableCell>
                      <TableCell>
                        <span className={cn("status-badge gap-1", status.className)}>
                          <StatusIcon className="h-3 w-3" />
                          {wig.statut}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
