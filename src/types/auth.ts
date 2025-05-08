
import { FeesCalculation, CommentItem } from './workflow';

export type UserRole = 
  | 'admin' 
  | 'accueil'               // Réception des dossiers
  | 'gestionnaire'          // Gestionnaire des dossiers
  | 'responsable_technique' // Responsable technique
  | 'chef_comite'           // Chef du comité technique
  | 'directeur_evaluation'  // Directeur de l'Évaluation de la Conformité
  | 'chef_inspections'      // Responsable des inspections
  | 'inspecteur'            // Inspecteur
  | 'laboratoire'           // Laboratoire pour analyses et essais
  | 'comptable'             // Service comptabilité
  | 'producteur'            // Opérateur économique
  | 'directeur';            // Direction générale

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
  department?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface WorkflowHistoryEntry {
  date: string;
  status: string;
  user: string;
  comment: string;
}

export interface CertificationRequest {
  id: number;
  companyName: string;
  promoterName: string;
  phone: string;
  products: string[];
  registrationDate: string;
  status: 'pending' | 'in_process' | 'approved' | 'rejected' | 'corrective_actions';
  workflowStatus?: string;
  workflowHistory?: WorkflowHistoryEntry[];
  comments?: CommentItem[];
  files: {
    businessRegistry?: string;
    taxpayerCard?: string;
    manufacturingProcess?: string;
    rawMaterialCertificate?: string;
    staffList?: string;
    productsList?: string;
  };
}

export interface TestParameter {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export interface Laboratory {
  id: number;
  name: string;
  email: string;
  specialization: string[];
}

export interface Inspector {
  id: number;
  name: string;
  email: string;
  specialization?: string[];
}

export interface InspectionMission {
  id: number;
  certificationRequestId: number;
  leadInspectorId: number;
  inspectorIds: number[];
  scheduledDate: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  reportFile?: string;
}
