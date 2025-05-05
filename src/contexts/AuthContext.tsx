
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'anor_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  const { toast } = useToast();

  useEffect(() => {
    // Charger l'utilisateur du localStorage au démarrage
    const loadUser = () => {
      try {
        const savedAuth = localStorage.getItem(STORAGE_KEY);
        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth);
          setAuthState({
            user: parsedAuth.user,
            isAuthenticated: true,
            isLoading: false
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données d\'authentification:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUser();
  }, []);

  // Simuler une API de connexion
  const login = async (email: string, password: string) => {
    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Utilisateurs de démonstration pour chaque rôle
      const demoUsers: Record<string, User> = {
        'admin@anor.cm': {
          id: 1,
          name: 'Admin ANOR',
          email: 'admin@anor.cm',
          role: 'admin',
          avatar: '/avatars/admin.jpg',
          permissions: ['manage_users', 'manage_certifications', 'manage_inspections', 'manage_settings', 'view_reports'],
          department: 'Administration'
        },
        'gestionnaire@anor.cm': {
          id: 2,
          name: 'Marie Gestionnaire',
          email: 'gestionnaire@anor.cm',
          role: 'gestionnaire',
          permissions: ['manage_certifications', 'manage_inspections', 'view_reports', 'view_all_requests', 'register_requests', 'evaluate_requests'],
          department: 'Certifications'
        },
        'inspecteur@anor.cm': {
          id: 3,
          name: 'Jean Inspecteur',
          email: 'inspecteur@anor.cm',
          role: 'inspecteur',
          permissions: ['perform_inspection', 'view_certifications'],
          department: 'Inspections'
        },
        'responsable@anor.cm': {
          id: 4,
          name: 'Pierre Technique',
          email: 'responsable@anor.cm',
          role: 'responsable_technique',
          permissions: ['review_certifications', 'manage_standards', 'view_reports', 'manage_test_parameters', 'view_all_requests'],
          department: 'Technique'
        },
        'directeur@anor.cm': {
          id: 5,
          name: 'Charles Directeur',
          email: 'directeur@anor.cm',
          role: 'directeur',
          permissions: ['approve_certifications', 'view_all', 'view_reports'],
          department: 'Direction'
        },
        'comptable@anor.cm': {
          id: 6,
          name: 'Sophie Comptable',
          email: 'comptable@anor.cm',
          role: 'comptable',
          permissions: ['manage_payments', 'view_certifications'],
          department: 'Finance'
        },
        'producteur@anor.cm': {
          id: 7,
          name: 'Paul Producteur',
          email: 'producteur@anor.cm',
          role: 'producteur',
          permissions: ['view_own_certifications', 'submit_applications'],
          department: null
        },
        // Nouveaux comptes utilisateurs
        'accueil@anor.cm': {
          id: 8,
          name: 'Réception ANOR',
          email: 'accueil@anor.cm',
          role: 'accueil',
          permissions: ['register_requests', 'view_all_requests'],
          department: 'Accueil'
        },
        'technique@anor.cm': {
          id: 9,
          name: 'Resp. Technique',
          email: 'technique@anor.cm',
          role: 'responsable_technique',
          permissions: ['view_all_requests', 'manage_test_parameters', 'assign_laboratories', 'review_reports'],
          department: 'Technique'
        },
        'laboratoire@anor.cm': {
          id: 10,
          name: 'Laboratoire Tests',
          email: 'laboratoire@anor.cm',
          role: 'laboratoire',
          permissions: ['upload_test_results', 'view_assigned_tests'],
          department: 'Laboratoire'
        },
        'inspections@anor.cm': {
          id: 11,
          name: 'Chef Inspections',
          email: 'inspections@anor.cm',
          role: 'chef_inspections',
          permissions: ['assign_inspectors', 'manage_inspections', 'view_all_requests'],
          department: 'Inspections'
        },
        'evaluations@anor.cm': {
          id: 12,
          name: 'Dir. Évaluation',
          email: 'evaluations@anor.cm',
          role: 'directeur_evaluation',
          permissions: ['make_final_decisions', 'view_all_requests', 'view_all_reports'],
          department: 'Évaluation'
        }
      };
      
      // Vérifier si l'email existe dans nos utilisateurs de démo
      if (!demoUsers[email]) {
        throw new Error('Utilisateur non trouvé');
      }
      
      // Le mot de passe est "password" pour tous les utilisateurs de démo
      if (password !== 'password') {
        throw new Error('Mot de passe incorrect');
      }
      
      const user = demoUsers[email];
      
      // Sauvegarder dans le localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user }));
      
      // Mettre à jour l'état
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.name}!`,
      });
    } catch (error) {
      let errorMessage = 'Erreur de connexion';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Échec de la connexion",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    toast({
      title: "Déconnexion réussie",
      description: "Vous êtes maintenant déconnecté",
    });
  };

  const hasPermission = (permission: string) => {
    return authState.user?.permissions.includes(permission) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
