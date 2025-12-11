import { cn } from '@/lib/utils';
import { NineBoxEmployee } from '@/types/ivela';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NineBoxGridProps {
  employees: NineBoxEmployee[];
  onCellClick?: (position: { performance: number; confiance: number }) => void;
}

const cellLabels = [
  ['Talents Cachés', 'Potentiels Émergents', 'Stars'],
  ['Contributeurs Stables', 'Cœur de l\'Équipe', 'Futurs Leaders'],
  ['À Réorienter', 'Performeurs en Développement', 'Experts Techniques'],
];

const cellColors = [
  ['nine-box-solid', 'nine-box-growth', 'nine-box-star'],
  ['nine-box-risk', 'nine-box-solid', 'nine-box-growth'],
  ['nine-box-risk', 'nine-box-risk', 'nine-box-solid'],
];

export function NineBoxGrid({ employees, onCellClick }: NineBoxGridProps) {
  const getEmployeesInCell = (perf: number, conf: number) => 
    employees.filter(e => e.position.performance === perf && e.position.confiance === conf);

  return (
    <div className="space-y-4">
      {/* Labels Y axis */}
      <div className="flex items-center gap-4">
        <div className="w-24 text-right text-xs font-medium text-muted-foreground">
          Confiance
        </div>
        <div className="flex-1" />
      </div>

      <div className="flex gap-4">
        {/* Y Axis Labels */}
        <div className="flex w-24 flex-col justify-between py-2 text-right text-xs text-muted-foreground">
          <span>Élevée</span>
          <span>Moyenne</span>
          <span>Faible</span>
        </div>

        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-2">
            {[3, 2, 1].map((confiance, rowIdx) => (
              [1, 2, 3].map((performance, colIdx) => {
                const cellEmployees = getEmployeesInCell(performance, confiance);
                return (
                  <div
                    key={`${performance}-${confiance}`}
                    className={cn(
                      "nine-box-cell min-h-[100px] flex flex-col",
                      cellColors[rowIdx][colIdx]
                    )}
                    onClick={() => onCellClick?.({ performance, confiance })}
                  >
                    <span className="text-xs font-medium text-foreground/80 mb-2">
                      {cellLabels[rowIdx][colIdx]}
                    </span>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {cellEmployees.map((emp) => (
                        <Tooltip key={emp.id}>
                          <TooltipTrigger asChild>
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary cursor-pointer hover:bg-primary/30 transition-colors">
                              {emp.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <div className="space-y-1">
                              <p className="font-medium">{emp.name}</p>
                              <p className="text-xs text-muted-foreground">{emp.division} • {emp.service}</p>
                              <div className="flex gap-3 text-xs">
                                <span>Perf: {emp.performanceScore.toFixed(1)}</span>
                                <span>Conf: {emp.confianceScore.toFixed(1)}</span>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                    <span className="text-lg font-bold text-foreground/60">
                      {cellEmployees.length}
                    </span>
                  </div>
                );
              })
            ))}
          </div>
          
          {/* X Axis Labels */}
          <div className="mt-2 flex justify-between px-2 text-xs text-muted-foreground">
            <span>Faible</span>
            <span>Moyenne</span>
            <span>Élevée</span>
          </div>
          <div className="mt-1 text-center text-xs font-medium text-muted-foreground">
            Performance
          </div>
        </div>
      </div>
    </div>
  );
}
