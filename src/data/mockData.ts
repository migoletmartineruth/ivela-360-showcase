import { 
  User, 
  EnterpriseWIG, 
  DivisionWIG, 
  TeamOKR, 
  IndividualGoal, 
  NineBoxEmployee,
  DashboardStats,
  Evaluation360,
  ManagerReview
} from '@/types/ivela';

export const currentUser: User = {
  id: 'u1',
  name: 'Jean-Marc Okoumba',
  matricule: 'SOG-2024-001',
  email: 'jm.okoumba@sogara.ga',
  role: 'drh',
  division: 'Ressources Humaines',
  service: 'Direction RH',
};

export const users: User[] = [
  currentUser,
  { id: 'u2', name: 'Marie Ndong', matricule: 'SOG-2024-002', email: 'marie.ndong@sogara.ga', role: 'n2', division: 'Production', service: 'Direction Production' },
  { id: 'u3', name: 'Pierre Mba', matricule: 'SOG-2024-003', email: 'pierre.mba@sogara.ga', role: 'n1', division: 'Production', service: 'Raffinerie', manager: 'u2' },
  { id: 'u4', name: 'Sophie Ekang', matricule: 'SOG-2024-004', email: 'sophie.ekang@sogara.ga', role: 'collaborateur', division: 'Production', service: 'Raffinerie', manager: 'u3' },
  { id: 'u5', name: 'Paul Oyono', matricule: 'SOG-2024-005', email: 'paul.oyono@sogara.ga', role: 'collaborateur', division: 'Production', service: 'Raffinerie', manager: 'u3' },
  { id: 'u6', name: 'Claire Essono', matricule: 'SOG-2024-006', email: 'claire.essono@sogara.ga', role: 'n1', division: 'Finance', service: 'Comptabilité', manager: 'u7' },
  { id: 'u7', name: 'André Nguema', matricule: 'SOG-2024-007', email: 'andre.nguema@sogara.ga', role: 'n2', division: 'Finance', service: 'Direction Finance' },
  { id: 'u8', name: 'Lucie Obame', matricule: 'SOG-2024-008', email: 'lucie.obame@sogara.ga', role: 'collaborateur', division: 'Finance', service: 'Comptabilité', manager: 'u6' },
];

export const enterpriseWIGs: EnterpriseWIG[] = [
  {
    id: 'ew1',
    annee: 2025,
    wig: 'Augmenter la production de 15%',
    description: 'Optimiser les processus de raffinage pour atteindre une augmentation de 15% de la production annuelle',
    proprietaire: 'Marie Ndong',
    dateValidation: '2025-01-15',
    statut: 'En cours',
  },
  {
    id: 'ew2',
    annee: 2025,
    wig: 'Réduire les coûts opérationnels de 10%',
    description: 'Mise en place de mesures d\'efficacité pour réduire les dépenses opérationnelles',
    proprietaire: 'André Nguema',
    dateValidation: '2025-01-15',
    statut: 'En cours',
  },
  {
    id: 'ew3',
    annee: 2025,
    wig: 'Améliorer l\'engagement collaborateurs à 85%',
    description: 'Développer la culture d\'entreprise et les programmes de bien-être',
    proprietaire: 'Jean-Marc Okoumba',
    dateValidation: '2025-01-15',
    statut: 'En cours',
  },
];

export const divisionWIGs: DivisionWIG[] = [
  { id: 'dw1', annee: 2025, division: 'Production', wigEntrepriseId: 'ew1', intitule: 'Moderniser la ligne de raffinage', indicateur: 'Taux de rendement', cible: '92%', n2: 'Marie Ndong', progression: 67 },
  { id: 'dw2', annee: 2025, division: 'Production', wigEntrepriseId: 'ew1', intitule: 'Former 100% des opérateurs', indicateur: 'Taux de formation', cible: '100%', n2: 'Marie Ndong', progression: 85 },
  { id: 'dw3', annee: 2025, division: 'Finance', wigEntrepriseId: 'ew2', intitule: 'Digitaliser la comptabilité', indicateur: 'Processus automatisés', cible: '80%', n2: 'André Nguema', progression: 45 },
  { id: 'dw4', annee: 2025, division: 'RH', wigEntrepriseId: 'ew3', intitule: 'Déployer IVELA 360', indicateur: 'Adoption', cible: '100%', n2: 'Jean-Marc Okoumba', progression: 72 },
];

export const teamOKRs: TeamOKR[] = [
  {
    id: 'okr1',
    annee: 2025,
    division: 'Production',
    service: 'Raffinerie',
    wigDivisionId: 'dw1',
    objectif: 'Atteindre 95% de disponibilité des équipements',
    kr1: 'Réduire les pannes non planifiées de 50%',
    kr2: 'Implémenter la maintenance prédictive sur 10 équipements critiques',
    kr3: 'Former 100% des techniciens aux nouvelles procédures',
    leadMeasures: 'Suivi hebdomadaire des indicateurs de disponibilité',
    n1: 'Pierre Mba',
    progression: 58,
  },
  {
    id: 'okr2',
    annee: 2025,
    division: 'Finance',
    service: 'Comptabilité',
    wigDivisionId: 'dw3',
    objectif: 'Automatiser 80% des écritures comptables',
    kr1: 'Migrer vers le nouveau ERP avant Q2',
    kr2: 'Réduire le temps de clôture mensuelle de 40%',
    kr3: 'Éliminer 100% des erreurs de saisie manuelle',
    leadMeasures: 'Tableau de bord quotidien des écritures automatisées',
    n1: 'Claire Essono',
    progression: 42,
  },
];

export const individualGoals: IndividualGoal[] = [
  {
    id: 'ig1',
    annee: 2025,
    division: 'Production',
    service: 'Raffinerie',
    matricule: 'SOG-2024-004',
    collaborateur: 'Sophie Ekang',
    n1: 'Pierre Mba',
    okrEquipeId: 'okr1',
    whatObjectifs: 'Superviser la maintenance préventive de la ligne A',
    whatPoids: 50,
    howABCD: 'Communication, Leadership, Rigueur',
    howPoids: 30,
    growPDI: 'Certification en gestion de projet',
    growPoids: 20,
    attentes360ABCD: 'Améliorer la collaboration inter-équipes',
    dateValidationN1: '2025-02-01',
    statut: 'En cours',
  },
  {
    id: 'ig2',
    annee: 2025,
    division: 'Production',
    service: 'Raffinerie',
    matricule: 'SOG-2024-005',
    collaborateur: 'Paul Oyono',
    n1: 'Pierre Mba',
    okrEquipeId: 'okr1',
    whatObjectifs: 'Implémenter le tableau de bord de maintenance',
    whatPoids: 45,
    howABCD: 'Innovation, Analyse, Proactivité',
    howPoids: 35,
    growPDI: 'Formation Power BI avancé',
    growPoids: 20,
    attentes360ABCD: 'Développer les compétences techniques de l\'équipe',
    dateValidationN1: '2025-02-01',
    statut: 'Validé',
  },
];

export const evaluations360: Evaluation360[] = [
  {
    id: 'e1',
    type: 'mid-year',
    annee: 2025,
    collaborateurId: 'u4',
    evaluateurId: 'u4',
    evaluateurType: 'auto',
    dateEvaluation: '2025-06-15',
    notePerformance: 3.5,
    noteConfiance: 4,
    commentaires: 'Bonne progression sur les objectifs. Maintenir le rythme.',
    statut: 'Terminé',
    abcdScores: { a: 4, b: 3.5, c: 4, d: 3 },
  },
  {
    id: 'e2',
    type: 'mid-year',
    annee: 2025,
    collaborateurId: 'u4',
    evaluateurId: 'u3',
    evaluateurType: 'n1',
    dateEvaluation: '2025-06-20',
    notePerformance: 3.8,
    noteConfiance: 4.2,
    commentaires: 'Sophie démontre un excellent engagement et des résultats solides.',
    statut: 'Terminé',
    abcdScores: { a: 4.2, b: 3.8, c: 4.1, d: 3.5 },
  },
];

export const managerReviews: ManagerReview[] = [
  {
    id: 'mr1',
    annee: 2025,
    collaborateurId: 'u4',
    managerId: 'u3',
    noteFinale: 3.7,
    confianceFinale: 4.1,
    recommandation: 'Promotion potentielle dans 12-18 mois',
    pip: false,
    dateRevue: '2025-07-01',
    statut: 'Validé',
  },
];

export const nineBoxEmployees: NineBoxEmployee[] = [
  { id: 'u4', name: 'Sophie Ekang', division: 'Production', service: 'Raffinerie', position: { performance: 3, confiance: 3 }, performanceScore: 4.2, confianceScore: 4.5 },
  { id: 'u5', name: 'Paul Oyono', division: 'Production', service: 'Raffinerie', position: { performance: 2, confiance: 3 }, performanceScore: 3.5, confianceScore: 4.2 },
  { id: 'u8', name: 'Lucie Obame', division: 'Finance', service: 'Comptabilité', position: { performance: 3, confiance: 2 }, performanceScore: 4.0, confianceScore: 3.2 },
  { id: 'n1', name: 'Thomas Ondo', division: 'Production', service: 'Logistique', position: { performance: 2, confiance: 2 }, performanceScore: 3.2, confianceScore: 3.5 },
  { id: 'n2', name: 'Emma Bibang', division: 'Finance', service: 'Trésorerie', position: { performance: 1, confiance: 2 }, performanceScore: 2.5, confianceScore: 3.0 },
  { id: 'n3', name: 'Michel Assoumou', division: 'Production', service: 'Maintenance', position: { performance: 3, confiance: 1 }, performanceScore: 4.5, confianceScore: 2.8 },
  { id: 'n4', name: 'Hélène Ella', division: 'RH', service: 'Formation', position: { performance: 2, confiance: 1 }, performanceScore: 3.0, confianceScore: 2.5 },
  { id: 'n5', name: 'François Nze', division: 'Production', service: 'Qualité', position: { performance: 1, confiance: 1 }, performanceScore: 2.2, confianceScore: 2.0 },
  { id: 'n6', name: 'Diane Moussavou', division: 'Finance', service: 'Contrôle', position: { performance: 1, confiance: 3 }, performanceScore: 2.8, confianceScore: 4.0 },
];

export const dashboardStats: DashboardStats = {
  totalCollaborateurs: 156,
  objectifsDefinis: 142,
  evaluationsCompletes: 89,
  calibrationTerminee: false,
  tauxCompletion: 72,
  alertes: 5,
};

export const divisions = ['Production', 'Finance', 'RH', 'IT', 'Commercial', 'Logistique'];

export const services: Record<string, string[]> = {
  Production: ['Raffinerie', 'Maintenance', 'Qualité', 'Logistique'],
  Finance: ['Comptabilité', 'Trésorerie', 'Contrôle de gestion', 'Audit'],
  RH: ['Formation', 'Recrutement', 'Administration RH', 'Direction RH'],
  IT: ['Infrastructure', 'Développement', 'Support', 'Sécurité'],
  Commercial: ['Ventes', 'Marketing', 'Service client'],
  Logistique: ['Approvisionnement', 'Transport', 'Stock'],
};
