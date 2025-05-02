
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { BadgeCheck, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Standards = () => {
  const { toast } = useToast();

  const handleCreateStandard = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La création de normes sera bientôt disponible.",
    });
  };

  return (
    <AppLayout requiredPermission="view_certifications">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Normes</h1>
            <p className="text-muted-foreground">Gestion des normes et standards</p>
          </div>
          <Button onClick={handleCreateStandard} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto">
            <PlusCircle className="h-4 w-4" />
            <span>Nouvelle norme</span>
          </Button>
        </div>

        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
          <div className="text-center">
            <BadgeCheck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune norme enregistrée</h3>
            <p className="mt-1 text-sm text-gray-500">Commencez par ajouter une norme</p>
            <div className="mt-6">
              <Button onClick={handleCreateStandard}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une norme
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Standards;
