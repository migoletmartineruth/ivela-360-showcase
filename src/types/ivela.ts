// IVELA 360 - Type Definitions

export type UserRole = 'collaborateur' | 'n1' | 'n2' | 'drh';

export interface User {
  id: string;
  name: string;
  matricule: string;
  email: string;
  role: UserRole;
  division: string;
  service: string;
  manager?: string;
  avatar?: string;
}

export interface EnterpriseWIG {
  id: string;
  annee: number;
  wig: string;
  description: string;
  proprietaire: string;
  dateValidation: string;
  statut: 'Brouillon' | 'Validé' | 'En cours' | 'Terminé';
}

export interface DivisionWIG {
  id: string;
  annee: number;
  division: string;
  wigEntrepriseId: string;
  intitule: string;
  indicateur: string;
  cible: string;
  n2: string;
  progression: number;
}

export interface TeamOKR {
  id: string;
  annee: number;
  division: string;
  service: string;
  wigDivisionId: string;
  objectif: string;
  kr1: string;
  kr2: string;
  kr3: string;
  kr4?: string;
  kr5?: string;
  leadMeasures: string;
  n1: string;
  progression: number;
}

export interface IndividualGoal {
  id: string;
  annee: number;
  division: string;
  service: string;
  matricule: string;
  collaborateur: string;
  n1: string;
  okrEquipeId: string;
  whatObjectifs: string;
  whatPoids: number;
  howABCD: string;
  howPoids: number;
  growPDI: string;
  growPoids: number;
  attentes360ABCD: string;
  dateValidationN1?: string;
  statut: 'Brouillon' | 'Soumis' | 'Validé' | 'En cours' | 'Terminé';
}

export interface Evaluation360 {
  id: string;
  type: 'mid-year' | 'end-year';
  annee: number;
  collaborateurId: string;
  evaluateurId: string;
  evaluateurType: 'auto' | 'n1' | 'pair' | 'n-1';
  dateEvaluation: string;
  notePerformance: number;
  noteConfiance: number;
  commentaires: string;
  statut: 'En attente' | 'En cours' | 'Terminé';
  abcdScores: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
}

export interface ManagerReview {
  id: string;
  annee: number;
  collaborateurId: string;
  managerId: string;
  noteFinale: number;
  confianceFinale: number;
  recommandation: string;
  pip: boolean;
  dateRevue: string;
  statut: 'Brouillon' | 'Soumis' | 'Validé';
}

export interface CalibrationSession {
  id: string;
  annee: number;
  division: string;
  dateSession: string;
  participantsIds: string[];
  statut: 'Planifiée' | 'En cours' | 'Terminée';
  decisions: CalibrationDecision[];
}

export interface CalibrationDecision {
  collaborateurId: string;
  noteInitiale: number;
  noteCalibree: number;
  confianceInitiale: number;
  confianceCalibree: number;
  justification: string;
}

export interface NineBoxPosition {
  performance: 1 | 2 | 3;
  confiance: 1 | 2 | 3;
}

export interface NineBoxEmployee {
  id: string;
  name: string;
  division: string;
  service: string;
  position: NineBoxPosition;
  performanceScore: number;
  confianceScore: number;
}

export interface PIP {
  id: string;
  collaborateurId: string;
  managerId: string;
  dateDebut: string;
  dateFin: string;
  objectifs: string[];
  jalons: string[];
  statut: 'En cours' | 'Réussi' | 'Échoué' | 'Prolongé';
}

export interface CasParticulier {
  id: string;
  collaborateurId: string;
  type: 'Congé longue durée' | 'Mutation' | 'Promotion' | 'Autre';
  description: string;
  dateDebut: string;
  dateFin?: string;
  impact: string;
}

export interface DashboardStats {
  totalCollaborateurs: number;
  objectifsDefinis: number;
  evaluationsCompletes: number;
  calibrationTerminee: boolean;
  tauxCompletion: number;
  alertes: number;
}
