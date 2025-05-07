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
