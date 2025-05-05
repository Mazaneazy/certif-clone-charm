
// Type d'une inspection
export interface Inspection {
  id: string;
  title: string;
  company: string;
  location: string;
  date: Date;
  inspectorName: string;
  notes?: string;
  status: 'planned' | 'completed' | 'cancelled';
}
