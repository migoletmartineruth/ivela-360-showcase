import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, FileText, Users, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'evaluation' | 'objective' | 'calibration' | 'alert' | 'submission';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'evaluation',
    title: 'Évaluation soumise',
    description: 'Sophie Ekang a complété son auto-évaluation mi-parcours',
    timestamp: 'Il y a 2h',
    user: 'Sophie Ekang',
  },
  {
    id: '2',
    type: 'objective',
    title: 'Objectifs validés',
    description: 'Pierre Mba a validé les objectifs de son équipe',
    timestamp: 'Il y a 4h',
    user: 'Pierre Mba',
  },
  {
    id: '3',
    type: 'calibration',
    title: 'Session planifiée',
    description: 'Session de calibration Division Production - 15 Dec 14h',
    timestamp: 'Hier',
  },
  {
    id: '4',
    type: 'alert',
    title: 'Rappel objectifs',
    description: '5 collaborateurs n\'ont pas encore soumis leurs objectifs',
    timestamp: 'Hier',
  },
  {
    id: '5',
    type: 'submission',
    title: 'Formulaire 360° reçu',
    description: 'Évaluation pair reçue pour Paul Oyono',
    timestamp: 'Il y a 2 jours',
  },
];

const typeIcons = {
  evaluation: CheckCircle2,
  objective: FileText,
  calibration: Users,
  alert: AlertCircle,
  submission: Clock,
};

const typeColors = {
  evaluation: 'bg-success/10 text-success',
  objective: 'bg-primary/10 text-primary',
  calibration: 'bg-info/10 text-info',
  alert: 'bg-warning/10 text-warning',
  submission: 'bg-accent/10 text-accent',
};

export function ActivityTimeline() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = typeIcons[activity.type];
        return (
          <div 
            key={activity.id} 
            className={cn(
              "flex gap-4 animate-slide-up opacity-0",
              `stagger-${index + 1}`
            )}
            style={{ animationFillMode: 'forwards' }}
          >
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              typeColors[activity.type]
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground/60">{activity.timestamp}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
