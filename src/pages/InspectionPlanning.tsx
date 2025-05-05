
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MissionProgramming from '@/components/inspections/MissionProgramming';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const InspectionPlanning = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <AppLayout requiredPermission="plan_inspections">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Planification des missions</h1>
            <p className="text-muted-foreground">
              Programmez des missions d'inspection en affectant des inspecteurs
            </p>
          </div>
          <Button 
            onClick={() => setIsDialogOpen(true)} 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Nouvelle mission</span>
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Programmer une mission d'inspection</DialogTitle>
              </DialogHeader>
              <MissionProgramming 
                onSubmit={(data) => {
                  toast({
                    title: "Mission programmée",
                    description: `La mission d'inspection a été planifiée pour le ${format(new Date(data.date), 'dd MMMM yyyy', { locale: fr })}.`,
                  });
                  setIsDialogOpen(false);
                }} 
                onCancel={() => setIsDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="calendar" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">
              <Calendar className="h-4 w-4 mr-2" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="inspectors">
              <Users className="h-4 w-4 mr-2" />
              Équipes d'inspection
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Calendrier des missions</h2>
              <p className="text-gray-500">Calendrier à implémenter</p>
              {/* Calendrier des missions à implémenter */}
            </div>
          </TabsContent>
          
          <TabsContent value="inspectors">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Équipes d'inspection</h2>
              <p className="text-gray-500">Visualisation des affectations des inspecteurs à implémenter</p>
              {/* Liste des équipes d'inspection à implémenter */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default InspectionPlanning;
