
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { CertificationRequest } from '@/types/auth';

const formSchema = z.object({
  companyName: z.string().min(3, {
    message: "Le nom de l'entreprise doit comporter au moins 3 caractères",
  }),
  promoterName: z.string().min(3, {
    message: "Le nom du promoteur doit comporter au moins 3 caractères",
  }),
  phone: z.string().min(9, {
    message: "Le numéro de téléphone doit comporter au moins 9 chiffres",
  }),
  products: z.string().min(3, {
    message: "Veuillez indiquer au moins un produit à certifier",
  }),
});

const CertificationRequestPage = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File | null;
  }>({
    businessRegistry: null,
    taxpayerCard: null,
    manufacturingProcess: null,
    rawMaterialCertificate: null,
    staffList: null,
    productsList: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingCompanies] = useState<string[]>(['ACME Industries', 'TechCorp Cameroon', 'FoodPro SA']); // Simuler des entreprises existantes

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      promoterName: "",
      phone: "",
      products: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Vérifier si le fichier est un PDF
      if (file.type !== 'application/pdf') {
        toast({
          title: "Format incorrect",
          description: "Veuillez télécharger uniquement des fichiers PDF",
          variant: "destructive",
        });
        return;
      }
      
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale autorisée est de 5 Mo",
          variant: "destructive",
        });
        return;
      }

      setUploadedFiles(prev => ({ ...prev, [fileType]: file }));
      
      toast({
        title: "Fichier téléchargé",
        description: `Le fichier ${file.name} a été téléchargé avec succès.`,
      });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Vérifier si le nom de l'entreprise existe déjà
    if (existingCompanies.includes(values.companyName)) {
      toast({
        title: "Erreur de validation",
        description: "Cette entreprise est déjà enregistrée dans le système.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Vérifier que les fichiers obligatoires sont présents
    const requiredFiles = ['businessRegistry', 'taxpayerCard', 'manufacturingProcess', 'staffList', 'productsList'];
    const missingFiles = requiredFiles.filter(fileType => !uploadedFiles[fileType]);
    
    if (missingFiles.length > 0) {
      toast({
        title: "Documents manquants",
        description: "Veuillez télécharger tous les documents obligatoires.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simuler une requête d'API
    setTimeout(() => {
      // Formater les produits comme un tableau
      const productsList = values.products
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0);

      const newRequest: Partial<CertificationRequest> = {
        companyName: values.companyName,
        promoterName: values.promoterName,
        phone: values.phone,
        products: productsList,
        registrationDate: new Date().toISOString(),
        status: 'pending',
        files: {
          businessRegistry: uploadedFiles.businessRegistry?.name,
          taxpayerCard: uploadedFiles.taxpayerCard?.name,
          manufacturingProcess: uploadedFiles.manufacturingProcess?.name,
          rawMaterialCertificate: uploadedFiles.rawMaterialCertificate?.name,
          staffList: uploadedFiles.staffList?.name,
          productsList: uploadedFiles.productsList?.name,
        }
      };

      console.log("Nouvelle demande de certification:", newRequest);

      // Réinitialiser le formulaire après soumission
      form.reset();
      setUploadedFiles({
        businessRegistry: null,
        taxpayerCard: null,
        manufacturingProcess: null,
        rawMaterialCertificate: null,
        staffList: null,
        productsList: null,
      });

      toast({
        title: "Demande soumise avec succès",
        description: "La demande de certification a été enregistrée.",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <AppLayout requiredPermission="register_requests">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nouvelle Demande de Certification</h1>
          <p className="text-muted-foreground">Enregistrement d'une nouvelle demande de certification</p>
        </div>

        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'entreprise*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: ACME Industries" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nom légal complet de l'entreprise
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="promoterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du promoteur*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Jean Dupont" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nom complet du responsable de l'entreprise
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 699123456" {...field} />
                      </FormControl>
                      <FormDescription>
                        Numéro de téléphone principal de contact
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produits à certifier*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Entrez les produits séparés par des virgules" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Liste des produits concernés par la demande de certification
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documents requis (format PDF uniquement)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Registre de Commerce*
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'businessRegistry')}
                        className="max-w-sm"
                      />
                      {uploadedFiles.businessRegistry && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Carte de contribuable (NIU)*
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'taxpayerCard')}
                        className="max-w-sm"
                      />
                      {uploadedFiles.taxpayerCard && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Schéma du processus de fabrication*
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'manufacturingProcess')}
                        className="max-w-sm"
                      />
                      {uploadedFiles.manufacturingProcess && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Certificat de conformité de la matière première (optionnel)
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'rawMaterialCertificate')}
                        className="max-w-sm"
                      />
                      {uploadedFiles.rawMaterialCertificate && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Liste du personnel (sur papier entête)*
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'staffList')}
                        className="max-w-sm"
                      />
                      {uploadedFiles.staffList && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Liste des produits à certifier*
                    </label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(e, 'productsList')}
                        className="max-w-sm"
                      />
                      {uploadedFiles.productsList && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Button type="submit" className="bg-anor-blue hover:bg-blue-800" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Soumission en cours...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Enregistrer la demande
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                  Effacer
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CertificationRequestPage;
