
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { TechnicalCommittee } from '@/types/committee';
import { getCommittees, deleteCommittee } from '@/services/committeeService';
import CommitteeForm from '@/components/committees/CommitteeForm';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TechnicalCommittees = () => {
  const [committees, setCommittees] = useState<TechnicalCommittee[]>(getCommittees());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCommittee, setSelectedCommittee] = useState<TechnicalCommittee | null>(null);
  const { toast } = useToast();

  const handleCreateCommittee = () => {
    setSelectedCommittee(null);
    setIsDialogOpen(true);
  };

  const handleEditCommittee = (committee: TechnicalCommittee) => {
    setSelectedCommittee(committee);
    setIsDialogOpen(true);
  };

  const handleDeleteCommittee = (id: number) => {
    try {
      deleteCommittee(id);
      setCommittees(getCommittees());
      toast({
        title: "Comité supprimé",
        description: "Le comité technique a été supprimé avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du comité",
        variant: "destructive"
      });
    }
  };

  const handleFormSuccess = () => {
    setCommittees(getCommittees());
    setIsDialogOpen(false);
    toast({
      title: selectedCommittee ? "Comité mis à jour" : "Comité créé",
      description: selectedCommittee 
        ? "Le comité technique a été mis à jour avec succès"
        : "Un nouveau comité technique a été créé avec succès"
    });
  };

  return (
    <AppLayout requiredPermission="manage_committees">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Comités Techniques</h1>
            <p className="text-muted-foreground">
              Gérez les comités techniques pour l'évaluation des certifications
            </p>
          </div>
          <Button onClick={handleCreateCommittee} className="flex items-center gap-2">
            <Plus size={16} />
            <span>Nouveau comité</span>
          </Button>
        </div>

        {committees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee) => (
              <Card key={committee.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{committee.name}</CardTitle>
                    <Badge variant={committee.status === 'active' ? 'default' : committee.status === 'completed' ? 'outline' : 'secondary'}>
                      {committee.status === 'active' ? 'Actif' : committee.status === 'completed' ? 'Terminé' : 'Brouillon'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Créé le {new Date(committee.creationDate).toLocaleDateString('fr-FR')}
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Chef du comité</h4>
                      <p className="mt-1">{committee.chief.name}</p>
                      <p className="text-xs text-muted-foreground">{committee.chief.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Membres</h4>
                      <ul className="mt-1 space-y-1">
                        {committee.members.map((member) => (
                          <li key={member.id} className="text-sm">
                            {member.name} {member.role && <span className="text-xs text-muted-foreground">({member.role})</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Objectif</h4>
                      <p className="mt-1 text-sm">{committee.purpose}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => handleEditCommittee(committee)}>
                    <Edit size={16} className="mr-1" /> Modifier
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteCommittee(committee.id)}>
                    <Trash2 size={16} className="mr-1" /> Supprimer
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border rounded-md p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Aucun comité technique</h3>
            <p className="mt-1 text-muted-foreground">
              Commencez par créer un comité technique pour l'évaluation des certifications.
            </p>
            <Button onClick={handleCreateCommittee} className="mt-6">
              Créer un comité technique
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedCommittee ? 'Modifier le comité technique' : 'Créer un nouveau comité technique'}
            </DialogTitle>
          </DialogHeader>
          <CommitteeForm 
            initialData={selectedCommittee} 
            onSuccess={handleFormSuccess} 
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default TechnicalCommittees;
