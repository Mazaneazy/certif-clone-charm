
import React from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const AppLayout = ({ children, requiredPermission }: AppLayoutProps) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  // Si en cours de chargement, afficher un spinner ou similaire
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si non authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si une permission est requise et que l'utilisateur ne l'a pas
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès Refusé</h1>
        <p className="mb-6">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex flex-col flex-1 ml-0 transition-all">
          <AppHeader />
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
