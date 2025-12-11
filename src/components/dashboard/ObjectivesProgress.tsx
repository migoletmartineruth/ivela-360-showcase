import { cn } from '@/lib/utils';
import { divisionWIGs } from '@/data/mockData';

export function ObjectivesProgress() {
  return (
    <div className="space-y-4">
      {divisionWIGs.map((wig, index) => (
        <div 
          key={wig.id}
          className={cn(
            "space-y-2 animate-slide-up opacity-0",
            `stagger-${index + 1}`
          )}
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground truncate pr-4">
                {wig.intitule}
              </p>
              <p className="text-xs text-muted-foreground">{wig.division}</p>
            </div>
            <span className={cn(
              "text-sm font-semibold",
              wig.progression >= 80 ? "text-success" :
              wig.progression >= 50 ? "text-warning" : "text-destructive"
            )}>
              {wig.progression}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={cn(
                "progress-fill",
                wig.progression >= 80 ? "bg-success" :
                wig.progression >= 50 ? "bg-warning" : "bg-destructive"
              )}
              style={{ width: `${wig.progression}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
