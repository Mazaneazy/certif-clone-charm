
export type UserRole = 'admin' | 'gestionnaire' | 'inspecteur' | 'responsable_technique' | 'directeur' | 'comptable' | 'producteur';

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
