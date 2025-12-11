import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronRight,
  FileText,
  ClipboardCheck,
  Grid3X3,
  AlertTriangle,
  Building2,
  Layers,
  User
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: { label: string; href: string }[];
}

const navigation: NavItem[] = [
  { label: 'Tableau de bord', href: '/', icon: LayoutDashboard },
  { 
    label: 'Objectifs', 
    icon: Target,
    children: [
      { label: 'WIGs Entreprise', href: '/objectives/enterprise-wigs' },
      { label: 'WIGs Division', href: '/objectives/division-wigs' },
      { label: 'OKR Équipe', href: '/objectives/team-okr' },
      { label: 'Objectifs Individuels', href: '/objectives/individual' },
    ]
  },
  { 
    label: 'Évaluations 360°', 
    icon: ClipboardCheck,
    children: [
      { label: 'Mi-Parcours', href: '/evaluations/mid-year' },
      { label: 'Fin d\'année', href: '/evaluations/end-year' },
      { label: 'Revue Manager', href: '/evaluations/manager-review' },
    ]
  },
  { label: 'Calibration', href: '/calibration', icon: BarChart3 },
  { label: 'Matrice 9-Box', href: '/nine-box', icon: Grid3X3 },
  { label: 'Cas Particuliers', href: '/special-cases', icon: AlertTriangle },
  { 
    label: 'Listes SharePoint', 
    icon: FileText,
    children: [
      { label: 'Toutes les listes', href: '/sharepoint/lists' },
      { label: 'Formulaires', href: '/sharepoint/forms' },
      { label: 'Automatisations', href: '/sharepoint/flows' },
    ]
  },
  { label: 'Power BI', href: '/powerbi', icon: BarChart3 },
];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Objectifs', 'Évaluations 360°']);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isChildActive = (children?: { href: string }[]) => 
    children?.some(child => location.pathname === child.href);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
          <Layers className="h-6 w-6 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">IVELA 360°</h1>
          <p className="text-xs text-sidebar-foreground/60">Gestion Performance</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => (
          <div key={item.label}>
            {item.href ? (
              <NavLink
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            ) : (
              <>
                <button
                  onClick={() => toggleExpanded(item.label)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isChildActive(item.children)
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </span>
                  {expandedItems.includes(item.label) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {expandedItems.includes(item.label) && item.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-all duration-200",
                          isActive(child.href)
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary">
            <User className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">Jean-Marc Okoumba</p>
            <p className="truncate text-xs text-sidebar-foreground/60">DRH • Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
