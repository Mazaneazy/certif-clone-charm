
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddLaboratoryForm from '@/components/laboratories/AddLaboratoryForm';
import { useToast } from '@/hooks/use-toast';

const Laboratories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmitForm = (data: any) => {
    console.log('Form submitted with:', data);
    toast({
      title: "Laboratoire ajouté",
      description: `Le laboratoire ${data.name} a été ajouté avec succès.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <AppLayout requiredPermission="assign_laboratories">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Laboratoires</h1>
            <p className="text-muted-foreground">
              Gérez les laboratoires partenaires pour les tests de certification.
            </p>
          </div>
          <Button 
            className="bg-anor-blue hover:bg-anor-blue/90"
            onClick={handleOpenDialog}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un laboratoire
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un laboratoire</DialogTitle>
              </DialogHeader>
              <AddLaboratoryForm onSubmit={handleSubmitForm} onCancel={handleCloseDialog} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="accredited" className="w-full">
          <TabsList>
            <TabsTrigger value="accredited">Laboratoires accrédités</TabsTrigger>
            <TabsTrigger value="partners">Laboratoires partenaires</TabsTrigger>
            <TabsTrigger value="tests">Tests disponibles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accredited" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((id) => (
                <Card key={id}>
                  <CardHeader>
                    <CardTitle>Laboratoire National {id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Spécialisé en tests mécaniques et chimiques</p>
                    <p className="text-sm mt-2">Email: lab{id}@example.com</p>
                    <p className="text-sm">Accréditation: ISO/IEC 17025</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">Détails</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="partners" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2].map((id) => (
                <Card key={id}>
                  <CardHeader>
                    <CardTitle>Laboratoire Partenaire {id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Spécialisé en tests électriques</p>
                    <p className="text-sm mt-2">Email: partner{id}@example.com</p>
                    <p className="text-sm">Partenariat depuis: 2022</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">Détails</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tests" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tests disponibles par laboratoire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Laboratoire National 1</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Test de résistance mécanique</li>
                      <li>Analyse chimique des matériaux</li>
                      <li>Test de durabilité</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Laboratoire Partenaire 1</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Test de conformité électrique</li>
                      <li>Test de compatibilité électromagnétique</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Laboratories;
