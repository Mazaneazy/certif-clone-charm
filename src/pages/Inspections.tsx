
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddInspectionForm from '@/components/inspections/AddInspectionForm';
import InspectionList from '@/components/inspections/InspectionList';
import InspectionCalendarView from '@/components/inspections/InspectionCalendarView';
import EmptyInspectionState from '@/components/inspections/EmptyInspectionState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInspections } from '@/hooks/useInspections';

const Inspections = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const {
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
    handleCloseDialog
  } = useInspections();

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
            <InspectionCalendarView 
              date={date}
              setDate={setDate}
              datesWithInspections={datesWithInspections}
              inspectionsForSelectedDate={inspectionsForSelectedDate}
              updateInspectionStatus={updateInspectionStatus}
              onAddInspection={handleOpenDialog}
            />
          </TabsContent>
          
          <TabsContent value="list">
            <InspectionList 
              inspections={inspections} 
              updateInspectionStatus={updateInspectionStatus} 
            />
          </TabsContent>
        </Tabs>
        
        {inspections.length === 0 && activeTab === "list" && (
          <EmptyInspectionState onAddInspection={handleOpenDialog} />
        )}
      </div>
    </AppLayout>
  );
};

export default Inspections;
