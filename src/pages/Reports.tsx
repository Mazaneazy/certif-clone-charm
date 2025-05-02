
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { BarChart, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "L'exportation de rapports sera bientôt disponible.",
    });
  };

  return (
    <AppLayout requiredPermission="view_reports">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
            <p className="text-muted-foreground">Statistiques et rapports d'activité</p>
          </div>
          <Button onClick={handleExportReport} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 self-start sm:self-auto">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
        </div>

        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
          <div className="text-center">
            <BarChart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Données statistiques</h3>
            <p className="mt-1 text-sm text-gray-500">Les rapports statistiques seront bientôt disponibles</p>
            <div className="mt-6">
              <Button onClick={handleExportReport}>
                <Download className="mr-2 h-4 w-4" />
                Exporter les données
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
