import { cn } from '@/lib/utils';
import { UserRole } from '@/types/ivela';
import { Shield, Users, User, Crown } from 'lucide-react';

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
  showIcon?: boolean;
}

const roleConfig = {
  drh: {
    label: 'DRH / Admin',
    icon: Crown,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  n2: {
    label: 'N+2',
    icon: Shield,
    className: 'bg-info/10 text-info border-info/20',
  },
  n1: {
    label: 'N+1 Manager',
    icon: Users,
    className: 'bg-success/10 text-success border-success/20',
  },
  collaborateur: {
    label: 'Collaborateur',
    icon: User,
    className: 'bg-muted text-muted-foreground border-border',
  },
};

export function RoleBadge({ role, className, showIcon = true }: RoleBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
      config.className,
      className
    )}>
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
}
