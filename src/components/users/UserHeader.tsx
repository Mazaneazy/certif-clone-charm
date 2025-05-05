
import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

interface UserHeaderProps {
  onCreateUser: () => void;
}

const UserHeader = ({ onCreateUser }: UserHeaderProps) => {
  const { user } = useAuth();
  
  // Seuls admin et directeur_evaluation peuvent créer des utilisateurs
  const canCreateUser = user && ['admin', 'directeur_evaluation'].includes(user.role);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
        <p className="text-muted-foreground">Gestion des utilisateurs et des droits d'accès</p>
      </div>
      {canCreateUser && (
        <Button onClick={onCreateUser} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto">
          <PlusCircle className="h-4 w-4" />
          <span>Nouvel utilisateur</span>
        </Button>
      )}
    </div>
  );
};

export default UserHeader;
