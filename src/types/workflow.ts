
// Adding the 'rejected' status to existing FeesCalculation type
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
  status: 'draft' | 'submitted' | 'approved' | 'paid' | 'rejected';
  validationComment?: string;
  validationDate?: string;
}

// Updating CommentItem to match what's used in the components
export interface CommentItem {
  id: string | number;
  text: string;
  author?: string;
  date?: string;
  userId?: number;
  userName?: string;
  userRole?: string;
  timestamp?: string;
  isInternal?: boolean;
}

// Updating WorkflowStep to include all properties used in components
export interface WorkflowStep {
  id: string | number;
  name: string;
  description?: string;
  order: number;
  status?: WorkflowStatus;
  isCompleted: boolean;
  isActive: boolean;
  dateCompleted?: string;
  actionRequired?: string;
  completedDate?: string;
}

// Updating WorkflowStatus to include all the statuses used in the workflow
export type WorkflowStatus = 
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'rejected'
  | 'cancelled'
  | 'on_hold'
  | 'reception'
  | 'evaluation_preliminary'
  | 'technical_review'
  | 'inspection_planning'
  | 'laboratory_testing'
  | 'evaluation_final'
  | 'decision_committee'
  | 'certification_issuance';

// Updating WorkflowAction to include all properties used in components
export interface WorkflowAction {
  id: string;
  name: string;
  label?: string;
  description?: string;
  availableInStatus: WorkflowStatus[];
  nextStatus: WorkflowStatus;
  actionType?: 'approve' | 'reject' | 'send_back' | 'request_info' | 'complete';
  requiresComment?: boolean;
  requiredRole?: string;
}
