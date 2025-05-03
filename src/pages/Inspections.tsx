
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Calendar, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddInspectionForm from '@/components/inspections/AddInspectionForm';

const Inspections = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitForm = (data: any) => {
    console.log('Inspection form submitted with:', data);
    toast({
      title: "Inspection planifiée",
      description: `L'inspection pour ${data.company} a été planifiée pour le ${new Date(data.date).toLocaleDateString('fr-FR')}.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <AppLayout requiredPermission="perform_inspection">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inspections</h1>
            <p className="text-muted-foreground">Planification et suivi des inspections</p>
          </div>
          <Button 
            onClick={handleOpenDialog} 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Nouvelle inspection</span>
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Planifier une inspection</DialogTitle>
              </DialogHeader>
              <AddInspectionForm onSubmit={handleSubmitForm} onCancel={handleCloseDialog} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
          <div className="text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune inspection planifiée</h3>
            <p className="mt-1 text-sm text-gray-500">Commencez par créer une nouvelle inspection</p>
            <div className="mt-6">
              <Button onClick={handleOpenDialog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Planifier une inspection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Inspections;
