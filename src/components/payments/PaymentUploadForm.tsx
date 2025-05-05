
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUp, Check } from 'lucide-react';

interface PaymentUploadFormProps {
  requestId: number;
  onPaymentUploaded: (paymentInfo: { receiptFile: string, amount: number, reference: string }) => void;
  onCancel: () => void;
}

const PaymentUploadForm: React.FC<PaymentUploadFormProps> = ({ 
  requestId, 
  onPaymentUploaded, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Vérifier le type de fichier (PDF uniquement)
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast({
          title: "Format incorrect",
          description: "Veuillez sélectionner un fichier PDF",
          variant: "destructive",
        });
        return;
      }

      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale autorisée est de 10MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reference || !amount || !selectedFile) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs et sélectionner un fichier PDF",
        variant: "destructive",
      });
      return;
    }
    
    // Simuler un envoi
    setIsSubmitting(true);

    // Dans une application réelle, on enverrait le fichier au serveur
    // Pour simuler, nous allons juste attendre un peu
    setTimeout(() => {
      // Simuler le succès
      onPaymentUploaded({
        receiptFile: `recu_paiement_${requestId}_${Date.now()}.pdf`,
        amount: parseFloat(amount),
        reference
      });

      toast({
        title: "Paiement enregistré",
        description: "Votre justificatif de paiement a été enregistré avec succès",
      });

      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reference">Référence du paiement</Label>
          <Input
            id="reference"
            value={reference}
            onChange={e => setReference(e.target.value)}
            placeholder="Ex: TF-2023-1234"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Montant payé (FCFA)</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Ex: 150000"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentFile">Justificatif de paiement (PDF)</Label>
        <div className="border-2 border-dashed rounded-lg border-gray-300 p-6 text-center cursor-pointer hover:border-primary transition-colors">
          <input
            type="file"
            id="paymentFile"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="paymentFile" className="cursor-pointer block w-full h-full">
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <Check className="h-8 w-8 text-green-500" />
                <p className="mt-2 text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">{Math.round(selectedFile.size / 1024)} KB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FileUp className="h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Cliquez pour sélectionner un fichier ou glissez-déposez</p>
                <p className="text-xs text-gray-400 mt-1">Format PDF uniquement, max 10MB</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Envoi en cours...
            </>
          ) : (
            <>
              <FileUp className="h-4 w-4 mr-2" />
              Enregistrer le paiement
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default PaymentUploadForm;
