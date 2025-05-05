
export type UserRole = 'admin' | 'gestionnaire' | 'inspecteur' | 'responsable_technique' | 'directeur' | 'comptable' | 'producteur' | 'accueil' | 'chef_inspections' | 'laboratoire' | 'directeur_evaluation';

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

export interface FeesCalculation {
  id: number;
  certificationRequestId: number;
  fileManagementFee: number;
  inspectionSamplingFee: number;
  surveillanceFee: number;
  testParameters: {
    parameterId: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'draft' | 'submitted' | 'approved' | 'paid';
}
