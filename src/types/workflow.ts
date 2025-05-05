
export type WorkflowStep = {
  id: string;
  name: string;
  description?: string;
  order: number;
  isCompleted: boolean;
  isActive: boolean;
  actionRequired?: string;
  dateCompleted?: string;
  completedBy?: string;
};

export type WorkflowStatus = 
  | 'reception' 
  | 'evaluation_preliminary' 
  | 'technical_review' 
  | 'inspection_planning'
  | 'laboratory_testing' 
  | 'evaluation_final'
  | 'decision_committee'
  | 'certification_issuance'
  | 'completed';

export interface WorkflowAction {
  id: string;
  name: string;
  description?: string;
  availableInStatus: WorkflowStatus[];
  nextStatus: WorkflowStatus;
  requiresComment?: boolean;
  requiresDocument?: boolean;
}
