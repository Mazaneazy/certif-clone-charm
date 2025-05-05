
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Inspection } from '@/types/inspection';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function useInspections() {
  const { toast } = useToast();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return {
    inspections,
    date,
    setDate,
    isDialogOpen,
    setIsDialogOpen,
    inspectionsForSelectedDate,
    datesWithInspections,
    updateInspectionStatus,
    handleSubmitForm,
    handleOpenDialog,
    handleCloseDialog,
  };
}
