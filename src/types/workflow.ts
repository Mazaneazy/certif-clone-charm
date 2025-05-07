
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

// Adding missing types that are causing build errors
export interface CommentItem {
  id: number;
  text: string;
  author: string;
  date: string;
  authorId?: number;
}

export interface WorkflowStep {
  id: number;
  name: string;
  status: WorkflowStatus;
  completedDate?: string;
}

export type WorkflowStatus = 
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'rejected'
  | 'cancelled'
  | 'on_hold';

export interface WorkflowAction {
  id: string;
  label: string;
  nextStatus: WorkflowStatus;
  actionType: 'approve' | 'reject' | 'send_back' | 'request_info' | 'complete';
  requiredRole?: string;
}
