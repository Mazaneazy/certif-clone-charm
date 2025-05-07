
export interface CommitteeMember {
  id: number;
  name: string;
  email: string;
  specialization: string[];
  role?: string;
  department?: string;
  isChief?: boolean;
}

export interface TechnicalCommittee {
  id: number;
  name: string;
  certificationRequestId?: number;
  chief: CommitteeMember;
  members: CommitteeMember[];
  creationDate: string;
  purpose: string;
  status: 'draft' | 'active' | 'completed';
}

export interface CommitteeFormValues {
  name: string;
  purpose: string;
  chiefId: number;
  memberIds: number[];
  memberRoles: Record<number, string>;
}
