
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, PlusCircle } from "lucide-react";

interface EmptyUserStateProps {
  onResetFilters: () => void;
  onCreateUser: () => void;
}

const EmptyUserState = ({ onResetFilters, onCreateUser }: EmptyUserStateProps) => {
  return (
    <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
      <div className="text-center">
        <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun utilisateur trouvé</h3>
        <p className="mt-1 text-sm text-gray-500">Réinitialisez les filtres ou créez un nouvel utilisateur</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onResetFilters} variant="outline">
            Réinitialiser les filtres
          </Button>
          <Button onClick={onCreateUser}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer un utilisateur
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyUserState;
