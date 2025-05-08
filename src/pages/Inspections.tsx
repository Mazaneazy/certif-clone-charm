
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddInspectionForm from '@/components/inspections/AddInspectionForm';
import { Calendar } from '@/components/ui/calendar';
import InspectionList from '@/components/inspections/InspectionList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Type d'une inspection
interface Inspection {
  id: string;
  title: string;
  company: string;
  location: string;
  date: Date;
  inspectorName: string;
  notes?: string;
  status: 'planned' | 'completed' | 'cancelled';
}

const Inspections = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("calendar");

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Fonction pour ajouter une nouvelle inspection
  const handleSubmitForm = (data: any) => {
    const newInspection: Inspection = {
      id: Date.now().toString(),
      title: data.title,
      company: data.company,
      location: data.location,
      date: new Date(data.date),
      inspectorName: data.inspectorName,
      notes: data.notes,
      status: 'planned'
    };
    
    setInspections([...inspections, newInspection]);
    
    toast({
      title: "Inspection planifiée",
      description: `L'inspection pour ${data.company} a été planifiée pour le ${format(new Date(data.date), 'dd MMMM yyyy', { locale: fr })}.`,
    });
    setIsDialogOpen(false);
  };

  // Filtrer les inspections pour la date sélectionnée
  const inspectionsForSelectedDate = inspections.filter(inspection => 
    date && 
    inspection.date.getDate() === date.getDate() &&
    inspection.date.getMonth() === date.getMonth() &&
    inspection.date.getFullYear() === date.getFullYear()
  );

  // Générer des dates qui ont des inspections
  const datesWithInspections = inspections.map(inspection => inspection.date);
  
  // Fonction pour mettre à jour le statut d'une inspection
  const updateInspectionStatus = (id: string, newStatus: 'planned' | 'completed' | 'cancelled') => {
    setInspections(inspections.map(inspection => 
      inspection.id === id ? { ...inspection, status: newStatus } : inspection
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `Le statut de l'inspection a été mis à jour avec succès.`,
    });
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

        <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">Calendrier</TabsTrigger>
            <TabsTrigger value="list">Liste</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="bg-white rounded-lg shadow p-4 flex-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  modifiersClassNames={{
                    selected: 'bg-primary text-white',
                  }}
                  // Mettre en évidence les jours avec des inspections
                  modifiers={{
                    inspection: datesWithInspections,
                  }}
                  modifiersStyles={{
                    inspection: {
                      fontWeight: 'bold',
                      border: '2px solid #10b981',
                      borderRadius: '100%',
                    }
                  }}
                />
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 flex-1">
                <h2 className="text-lg font-semibold mb-4">
                  {date ? (
                    `Inspections du ${format(date, 'dd MMMM yyyy', { locale: fr })}`
                  ) : (
                    'Sélectionnez une date'
                  )}
                </h2>
                
                {inspectionsForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {inspectionsForSelectedDate.map(inspection => (
                      <div key={inspection.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{inspection.title}</h3>
                        <p className="text-sm text-gray-600">Entreprise: {inspection.company}</p>
                        <p className="text-sm text-gray-600">Lieu: {inspection.location}</p>
                        <p className="text-sm text-gray-600">Inspecteur: {inspection.inspectorName}</p>
                        {inspection.notes && <p className="text-sm text-gray-600 mt-2">{inspection.notes}</p>}
                        <div className="mt-3 flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={inspection.status === 'planned' ? 'bg-yellow-100' : ''}
                            onClick={() => updateInspectionStatus(inspection.id, 'planned')}
                          >
                            Planifiée
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={inspection.status === 'completed' ? 'bg-green-100' : ''}
                            onClick={() => updateInspectionStatus(inspection.id, 'completed')}
                          >
                            Terminée
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className={inspection.status === 'cancelled' ? 'bg-red-100' : ''}
                            onClick={() => updateInspectionStatus(inspection.id, 'cancelled')}
                          >
                            Annulée
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune inspection</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Aucune inspection n'est planifiée pour cette date.
                    </p>
                    <div className="mt-6">
                      <Button onClick={handleOpenDialog}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Planifier une inspection
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <InspectionList 
              inspections={inspections} 
              updateInspectionStatus={updateInspectionStatus} 
            />
          </TabsContent>
        </Tabs>
        
        {inspections.length === 0 && activeTab === "list" && (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
            <div className="text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
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
        )}
      </div>
    </AppLayout>
  );
};

export default Inspections;
