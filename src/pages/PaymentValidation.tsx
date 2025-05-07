import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FeesCalculation } from '@/types/workflow';
import { getFeesCalculations, validatePayment } from '@/services/paymentValidationService';
import { Check, X, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

const PaymentValidation = () => {
  const [fees, setFees] = useState<FeesCalculation[]>(getFeesCalculations());
  const [activeTab, setActiveTab] = useState('pending');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeesCalculation | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleOpenDialog = (fee: FeesCalculation, approve: boolean) => {
    setSelectedFee(fee);
    setIsApproving(approve);
    setComment('');
    setDialogOpen(true);
  };

  const handleValidate = () => {
    if (!selectedFee) return;
    
    try {
      validatePayment(selectedFee.id, isApproving, comment);
      setFees(getFeesCalculations());
      setDialogOpen(false);
      
      toast({
        title: isApproving ? "Paiement validé" : "Paiement rejeté",
        description: isApproving 
          ? `Le paiement pour la demande #${selectedFee.certificationRequestId} a été validé`
          : `Le paiement pour la demande #${selectedFee.certificationRequestId} a été rejeté`,
      });
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la validation du paiement",
        variant: "destructive",
      });
    }
  };

  const filteredFees = fees.filter(fee => {
    if (activeTab === 'pending') {
      return fee.status === 'submitted';
    } else if (activeTab === 'approved') {
      return fee.status === 'approved';
    } else if (activeTab === 'rejected') {
      return fee.status === 'rejected';
    }
    return true;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);
  };

  return (
    <AppLayout requiredPermission="manage_fees">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Validation des paiements</h1>
          <p className="text-muted-foreground">
            Vérifiez et validez les paiements des frais de certification
          </p>
        </div>

        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="approved">Validés</TabsTrigger>
            <TabsTrigger value="rejected">Rejetés</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {filteredFees.length > 0 ? (
              <div className="grid gap-6">
                {filteredFees.map((fee) => (
                  <Card key={fee.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle>Demande #{fee.certificationRequestId}</CardTitle>
                          <CardDescription>
                            Réf. paiement: {fee.id}
                          </CardDescription>
                        </div>
                        <Badge variant={
                          fee.status === 'approved' ? 'default' : 
                          fee.status === 'rejected' ? 'destructive' : 
                          'secondary'
                        }>
                          {fee.status === 'approved' ? 'Validé' : 
                           fee.status === 'rejected' ? 'Rejeté' : 
                           'En attente'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-sm font-medium">Total des frais:</div>
                        <div className="text-right font-semibold">
                          {formatCurrency(fee.totalAmount)}
                        </div>
                        
                        <div className="text-sm font-medium">Frais de gestion:</div>
                        <div className="text-right">
                          {formatCurrency(fee.fileManagementFee)}
                        </div>
                        
                        <div className="text-sm font-medium">Frais d'inspection:</div>
                        <div className="text-right">
                          {formatCurrency(fee.inspectionSamplingFee)}
                        </div>
                        
                        <div className="text-sm font-medium">Frais de surveillance:</div>
                        <div className="text-right">
                          {formatCurrency(fee.surveillanceFee)}
                        </div>
                        
                        <div className="text-sm font-medium">Tests ({fee.testParameters.reduce((acc, p) => acc + p.quantity, 0)}):</div>
                        <div className="text-right">
                          {formatCurrency(
                            fee.totalAmount - 
                            fee.fileManagementFee - 
                            fee.inspectionSamplingFee - 
                            fee.surveillanceFee
                          )}
                        </div>
                      </div>
                      
                      {fee.validationComment && (
                        <div className="mt-4 border-t pt-2">
                          <p className="text-sm font-medium">Commentaire:</p>
                          <p className="text-sm mt-1">{fee.validationComment}</p>
                        </div>
                      )}
                    </CardContent>
                    {fee.status === 'submitted' && (
                      <CardFooter className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleOpenDialog(fee, false)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Rejeter
                        </Button>
                        <Button 
                          onClick={() => handleOpenDialog(fee, true)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Valider
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 border rounded-md">
                {activeTab === 'pending' ? (
                  <>
                    <AlertCircle className="h-12 w-12 text-yellow-500" />
                    <h3 className="mt-4 text-lg font-medium">Aucun paiement en attente</h3>
                    <p className="text-muted-foreground mt-1">
                      Tous les paiements ont été traités
                    </p>
                  </>
                ) : activeTab === 'approved' ? (
                  <>
                    <Check className="h-12 w-12 text-green-500" />
                    <h3 className="mt-4 text-lg font-medium">Aucun paiement validé</h3>
                    <p className="text-muted-foreground mt-1">
                      Aucun paiement n'a encore été validé
                    </p>
                  </>
                ) : (
                  <>
                    <X className="h-12 w-12 text-red-500" />
                    <h3 className="mt-4 text-lg font-medium">Aucun paiement rejeté</h3>
                    <p className="text-muted-foreground mt-1">
                      Aucun paiement n'a été rejeté
                    </p>
                  </>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isApproving ? "Valider le paiement" : "Rejeter le paiement"}
            </DialogTitle>
            <DialogDescription>
              {isApproving 
                ? "Confirmez que vous avez vérifié le paiement et qu'il peut être validé."
                : "Veuillez indiquer la raison du rejet du paiement."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder={isApproving 
                ? "Commentaire optionnel..."
                : "Motif du rejet du paiement..."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
              required={!isApproving}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              type="button"
              variant={isApproving ? "default" : "destructive"}
              onClick={handleValidate}
              disabled={!isApproving && !comment.trim()}
            >
              {isApproving ? "Valider le paiement" : "Rejeter le paiement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default PaymentValidation;
