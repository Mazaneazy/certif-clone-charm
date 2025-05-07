
import { FeesCalculation } from '@/types/auth';

// Clé pour le stockage local
const FEES_STORAGE_KEY = 'fees-calculations';
const REPORTS_STORAGE_KEY = 'technical-reports';

// Types pour les rapports techniques
export interface TechnicalReport {
  id: number;
  certificationRequestId: number;
  requestId?: number;
  inspectionReportId?: number;
  laboratoryReportId?: number;
  technicalOpinion: string;
  recommendationForDirector: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdDate: string;
  submittedDate?: string;
  createdBy: number;
  attachments?: string[];
}

// Données initiales pour les calculs de frais
const initialFees: FeesCalculation[] = [
  {
    id: 1,
    certificationRequestId: 1,
    fileManagementFee: 50000,
    inspectionSamplingFee: 150000,
    surveillanceFee: 100000,
    testParameters: [
      { parameterId: 1, quantity: 2 },
      { parameterId: 3, quantity: 1 }
    ],
    totalAmount: 350000,
    status: 'submitted'
  },
  {
    id: 2,
    certificationRequestId: 2,
    fileManagementFee: 50000,
    inspectionSamplingFee: 120000,
    surveillanceFee: 80000,
    testParameters: [
      { parameterId: 2, quantity: 3 }
    ],
    totalAmount: 280000,
    status: 'draft'
  }
];

// Données initiales pour les rapports techniques
const initialReports: TechnicalReport[] = [];

// Récupération des calculs de frais depuis le stockage local
export const getFeesCalculations = (): FeesCalculation[] => {
  const storedFees = localStorage.getItem(FEES_STORAGE_KEY);
  
  if (storedFees) {
    try {
      return JSON.parse(storedFees);
    } catch (error) {
      console.error('Erreur lors du chargement des frais:', error);
      localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(initialFees));
      return initialFees;
    }
  } else {
    localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(initialFees));
    return initialFees;
  }
};

// Validation d'un paiement par le responsable technique
export const validatePayment = (
  feeId: number, 
  validated: boolean, 
  comment?: string
): FeesCalculation => {
  const fees = getFeesCalculations();
  const index = fees.findIndex(f => f.id === feeId);
  
  if (index === -1) {
    throw new Error(`Calcul de frais non trouvé: ${feeId}`);
  }
  
  const updatedFee = {
    ...fees[index],
    status: validated ? 'approved' : 'rejected',
    validationComment: comment,
    validationDate: new Date().toISOString()
  };
  
  fees[index] = updatedFee;
  localStorage.setItem(FEES_STORAGE_KEY, JSON.stringify(fees));
  
  return updatedFee;
};

// Récupération des rapports techniques
export const getTechnicalReports = (): TechnicalReport[] => {
  const storedReports = localStorage.getItem(REPORTS_STORAGE_KEY);
  
  if (storedReports) {
    try {
      return JSON.parse(storedReports);
    } catch (error) {
      console.error('Erreur lors du chargement des rapports:', error);
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(initialReports));
      return initialReports;
    }
  } else {
    localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(initialReports));
    return initialReports;
  }
};

// Création d'un nouveau rapport technique
export const createTechnicalReport = (report: Omit<TechnicalReport, 'id'>): TechnicalReport => {
  const reports = getTechnicalReports();
  
  const newId = reports.length > 0 
    ? Math.max(...reports.map(r => r.id)) + 1 
    : 1;
  
  const newReport: TechnicalReport = {
    ...report,
    id: newId
  };
  
  const updatedReports = [...reports, newReport];
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updatedReports));
  
  return newReport;
};

// Mise à jour d'un rapport technique existant
export const updateTechnicalReport = (id: number, updates: Partial<TechnicalReport>): TechnicalReport => {
  const reports = getTechnicalReports();
  const index = reports.findIndex(r => r.id === id);
  
  if (index === -1) {
    throw new Error(`Rapport non trouvé: ${id}`);
  }
  
  const updatedReport = {
    ...reports[index],
    ...updates
  };
  
  reports[index] = updatedReport;
  localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
  
  return updatedReport;
};
