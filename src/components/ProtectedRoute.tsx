
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from './layout/AppLayout';

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredPermission }) => {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  // Si en cours de chargement, afficher un spinner
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
    return <Navigate to="/" replace />;
  }

  // Si tout est bon, afficher le composant demandé à l'intérieur du layout
  return <AppLayout requiredPermission={requiredPermission}>{element}</AppLayout>;
};

export default ProtectedRoute;
