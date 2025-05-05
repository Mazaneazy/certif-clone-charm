
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { WorkflowAction } from '@/types/workflow';

interface WorkflowActionsProps {
  currentStatus: string;
  actions: WorkflowAction[];
  onPerformAction: (actionId: string, comment?: string) => void;
}

const WorkflowActions: React.FC<WorkflowActionsProps> = ({ 
  currentStatus, 
  actions, 
  onPerformAction 
}) => {
  const { toast } = useToast();
  const [selectedAction, setSelectedAction] = useState<WorkflowAction | null>(null);
  const [comment, setComment] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filtrer les actions disponibles pour le statut actuel
  const availableActions = actions.filter(action => 
    action.availableInStatus.includes(currentStatus as any)
  );

  const handleActionClick = (action: WorkflowAction) => {
    setSelectedAction(action);
    
    if (action.requiresComment) {
      setIsDialogOpen(true);
    } else {
      performAction(action.id);
    }
  };

  const performAction = (actionId: string, userComment?: string) => {
    try {
      onPerformAction(actionId, userComment);
      toast({
        title: "Action effectuée",
        description: "Le flux de travail a été mis à jour avec succès.",
      });
      closeDialog();
    } catch (error) {
      console.error("Erreur lors de l'action:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'exécution de l'action.",
        variant: "destructive",
      });
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setComment('');
    setSelectedAction(null);
  };

  const handleConfirm = () => {
    if (selectedAction) {
      performAction(selectedAction.id, comment);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Actions disponibles</h3>
      {availableActions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {availableActions.map(action => (
            <Button 
              key={action.id}
              onClick={() => handleActionClick(action)}
              variant="outline"
              className="border-blue-300 hover:bg-blue-50"
            >
              {action.name}
            </Button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Aucune action disponible pour le moment.</p>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAction?.name}</DialogTitle>
            <DialogDescription>
              {selectedAction?.description || "Veuillez fournir des informations complémentaires pour cette action."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              placeholder="Ajoutez un commentaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Annuler</Button>
            <Button onClick={handleConfirm} disabled={selectedAction?.requiresComment && !comment.trim()}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkflowActions;
