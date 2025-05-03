
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CertificationRequest } from '@/types/auth';

// Définition du schéma de validation
const formSchema = z.object({
  companyName: z.string().min(2, { message: "Le nom de l'entreprise est requis" }),
  promoterName: z.string().min(2, { message: "Le nom du promoteur est requis" }),
  phone: z.string().min(8, { message: "Le numéro de téléphone est requis" }),
  products: z.string().min(2, { message: "Au moins un produit est requis" }),
  businessRegistry: z.string().optional(),
  taxpayerCard: z.string().optional(),
  manufacturingProcess: z.string().optional(),
  rawMaterialCertificate: z.string().optional(),
  staffList: z.string().optional(),
  productsList: z.string().optional(),
});

const CertificationRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialisation du formulaire avec React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      promoterName: "",
      phone: "",
      products: "",
      businessRegistry: "",
      taxpayerCard: "",
      manufacturingProcess: "",
      rawMaterialCertificate: "",
      staffList: "",
      productsList: "",
    },
  });

  // Gestionnaire de soumission du formulaire
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulation d'un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));

      // Préparer les données de la demande
      const products = values.products.split(',').map(p => p.trim());
      const now = new Date().toISOString();

      const newRequest: Omit<CertificationRequest, 'id'> = {
        companyName: values.companyName,
        promoterName: values.promoterName,
        phone: values.phone,
        products,
        registrationDate: now,
        status: "pending",
        files: {
          businessRegistry: values.businessRegistry || undefined,
          taxpayerCard: values.taxpayerCard || undefined,
          manufacturingProcess: values.manufacturingProcess || undefined,
          rawMaterialCertificate: values.rawMaterialCertificate || undefined,
          staffList: values.staffList || undefined,
          productsList: values.productsList || undefined
        }
      };

      // Log de la nouvelle demande pour débogage
      console.info("Nouvelle demande de certification:", newRequest);

      // Vérifier si la fonction globale est disponible
      // @ts-ignore - La fonction est ajoutée dynamiquement à window
      if (typeof window.addCertificationRequest === 'function') {
        // @ts-ignore - Appel de la fonction globale
        const savedRequest = window.addCertificationRequest(newRequest);
        
        toast({
          title: "Demande soumise",
          description: `La demande de certification pour ${values.companyName} a été enregistrée avec succès.`,
        });

        // Rediriger vers la liste des demandes
        navigate('/certification-requests');
      } else {
        // Fallback si la fonction n'est pas disponible
        toast({
          title: "Erreur",
          description: "Impossible d'enregistrer la demande. Le système n'est pas disponible.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de la demande.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout requiredPermission="register_requests">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nouvelle Demande de Certification</h1>
          <p className="text-muted-foreground">Formulaire de soumission d'une demande de certification</p>
        </div>

        <div className="border rounded-lg p-6 bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'entreprise</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: SABC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="promoterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du promoteur</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Jean Dupont" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 677123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produits (séparés par des virgules)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ex: Bière 33 Export, Beaufort Lager, Castel Beer" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Documents requis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Dans un environnement réel, ces champs permettraient de télécharger des fichiers. 
                  Pour cette démonstration, veuillez simplement indiquer le nom du fichier.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="businessRegistry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registre de commerce</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: registre_commerce.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxpayerCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carte de contribuable (NIU)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: niu.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="manufacturingProcess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Processus de fabrication</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: processus.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rawMaterialCertificate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificat matières premières (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: matieres_premieres.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="staffList"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Liste du personnel</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: personnel.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productsList"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Liste des produits</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: produits.pdf" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/certification-requests')}
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Soumission en cours..." : "Soumettre la demande"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CertificationRequest;
