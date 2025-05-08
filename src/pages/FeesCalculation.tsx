
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Calculator, Save, Trash2, Plus, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TestParameter, CertificationRequest } from '@/types/auth';
import { FeesCalculation } from '@/types/workflow';

// Demo test parameters
const demoParameters: TestParameter[] = [
  {
    id: 1,
    name: "pH",
    price: 12500,
    description: "Mesure du niveau d'acidité",
  },
  {
    id: 2,
    name: "Conductivité",
    price: 15000,
    description: "Mesure de la conductivité électrique",
  },
  {
    id: 3,
    name: "Teneur en plomb",
    price: 25000,
    description: "Analyse de la concentration en plomb",
  },
  {
    id: 4,
    name: "Analyse microbiologique",
    price: 35000,
    description: "Détection des microorganismes pathogènes",
  }
];

// Demo requests
const demoRequests: CertificationRequest[] = [
  {
    id: 1,
    companyName: "TechCorp Cameroon",
    promoterName: "Jean Mbarga",
    phone: "699123456",
    products: ["Ordinateurs portables", "Tablettes"],
    registrationDate: "2025-01-15",
    status: "in_process",
    files: {
      businessRegistry: "registre_commerce_techcorp.pdf",
      taxpayerCard: "niu_techcorp.pdf",
      manufacturingProcess: "processus_techcorp.pdf",
      staffList: "personnel_techcorp.pdf",
      productsList: "produits_techcorp.pdf"
    }
  },
  {
    id: 2,
    companyName: "FoodPro SA",
    promoterName: "Marie Nkolo",
    phone: "677889900",
    products: ["Jus de fruits", "Conserves"],
    registrationDate: "2025-02-20",
    status: "pending",
    files: {
      businessRegistry: "registre_commerce_foodpro.pdf",
      taxpayerCard: "niu_foodpro.pdf",
      manufacturingProcess: "processus_foodpro.pdf",
      rawMaterialCertificate: "matieres_premieres_foodpro.pdf",
      staffList: "personnel_foodpro.pdf",
      productsList: "produits_foodpro.pdf"
    }
  }
];

// Schema for the form
const formSchema = z.object({
  requestId: z.string({
    required_error: "Veuillez sélectionner une demande",
  }),
  fileManagementFee: z.string().refine((val) => {
    const fee = parseFloat(val);
    return !isNaN(fee) && fee >= 0;
  }, {
    message: "Le montant doit être un nombre valide et positif",
  }),
  inspectionSamplingFee: z.string().refine((val) => {
    const fee = parseFloat(val);
    return !isNaN(fee) && fee >= 0;
  }, {
    message: "Le montant doit être un nombre valide et positif",
  }),
  surveillanceFee: z.string().refine((val) => {
    const fee = parseFloat(val);
    return !isNaN(fee) && fee >= 0;
  }, {
    message: "Le montant doit être un nombre valide et positif",
  })
});

interface SelectedParameter {
  parameterId: number;
  name: string;
  price: number;
  quantity: number;
}

const FeesCalculationPage = () => {
  const { toast } = useToast();
  const [selectedParameters, setSelectedParameters] = useState<SelectedParameter[]>([]);
  const [selectedParameter, setSelectedParameter] = useState<string>(""); 
  const [parameterQuantity, setParameterQuantity] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestId: "",
      fileManagementFee: "50000",
      inspectionSamplingFee: "100000",
      surveillanceFee: "75000",
    },
  });
  
  // Calculate total amount whenever values change
  useEffect(() => {
    const values = form.getValues();
    const fileManagementFee = parseFloat(values.fileManagementFee) || 0;
    const inspectionSamplingFee = parseFloat(values.inspectionSamplingFee) || 0;
    const surveillanceFee = parseFloat(values.surveillanceFee) || 0;
    
    const parametersTotal = selectedParameters.reduce((sum, param) => {
      return sum + (param.price * param.quantity);
    }, 0);
    
    const total = fileManagementFee + inspectionSamplingFee + surveillanceFee + parametersTotal;
    setTotalAmount(total);
  }, [form.watch(), selectedParameters]);

  const handleAddParameter = () => {
    if (!selectedParameter || parameterQuantity < 1) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un paramètre et une quantité valide.",
        variant: "destructive",
      });
      return;
    }

    const paramId = parseInt(selectedParameter);
    const parameter = demoParameters.find(p => p.id === paramId);
    
    if (!parameter) {
      toast({
        title: "Erreur",
        description: "Paramètre non trouvé.",
        variant: "destructive",
      });
      return;
    }

    // Check if parameter is already in the list
    const existingIndex = selectedParameters.findIndex(p => p.parameterId === paramId);
    
    if (existingIndex >= 0) {
      // Update quantity if exists
      const updatedParameters = [...selectedParameters];
      updatedParameters[existingIndex].quantity += parameterQuantity;
      setSelectedParameters(updatedParameters);
    } else {
      // Add new parameter
      setSelectedParameters([
        ...selectedParameters,
        {
          parameterId: parameter.id,
          name: parameter.name,
          price: parameter.price,
          quantity: parameterQuantity
        }
      ]);
    }

    // Reset selection
    setSelectedParameter("");
    setParameterQuantity(1);

    toast({
      title: "Paramètre ajouté",
      description: `${parameter.name} ajouté à la note de frais.`,
    });
  };

  const handleRemoveParameter = (paramId: number) => {
    setSelectedParameters(selectedParameters.filter(p => p.parameterId !== paramId));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    if (selectedParameters.length === 0) {
      toast({
        title: "Attention",
        description: "Veuillez ajouter au moins un paramètre de test.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Create fees calculation object
      const feesCalculation: Partial<FeesCalculation> = {
        certificationRequestId: parseInt(values.requestId),
        fileManagementFee: parseFloat(values.fileManagementFee),
        inspectionSamplingFee: parseFloat(values.inspectionSamplingFee),
        surveillanceFee: parseFloat(values.surveillanceFee),
        testParameters: selectedParameters.map(p => ({
          parameterId: p.parameterId,
          quantity: p.quantity
        })),
        totalAmount: totalAmount,
        status: 'draft'
      };

      console.log("Note de frais créée:", feesCalculation);

      toast({
        title: "Note de frais enregistrée",
        description: `Note de frais pour la demande #${values.requestId} créée avec succès.`,
      });

      // Reset form
      form.reset({
        requestId: "",
        fileManagementFee: "50000",
        inspectionSamplingFee: "100000",
        surveillanceFee: "75000",
      });
      setSelectedParameters([]);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <AppLayout requiredPermission="manage_test_parameters">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calcul des Frais</h1>
          <p className="text-muted-foreground">Établissement de la note de frais pour les demandes de certification</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Note de Frais</CardTitle>
              <CardDescription>
                Définissez les frais associés à la demande de certification
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="requestId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Demande de Certification</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une demande" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {demoRequests.map(request => (
                              <SelectItem key={request.id} value={request.id.toString()}>
                                {request.companyName} - Demande #{request.id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="fileManagementFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frais de gestion</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input type="number" {...field} min="0" />
                              <span className="ml-2 flex items-center text-sm text-muted-foreground">
                                FCFA
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inspectionSamplingFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inspection & échantillonnage</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input type="number" {...field} min="0" />
                              <span className="ml-2 flex items-center text-sm text-muted-foreground">
                                FCFA
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="surveillanceFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surveillance</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input type="number" {...field} min="0" />
                              <span className="ml-2 flex items-center text-sm text-muted-foreground">
                                FCFA
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-3">Paramètres d'analyse et d'essai en laboratoire</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <div className="flex-grow">
                        <Select
                          value={selectedParameter}
                          onValueChange={setSelectedParameter}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un paramètre" />
                          </SelectTrigger>
                          <SelectContent>
                            {demoParameters.map(param => (
                              <SelectItem key={param.id} value={param.id.toString()}>
                                {param.name} - {param.price.toLocaleString('fr-FR')} FCFA
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full sm:w-32">
                        <Input
                          type="number"
                          min="1"
                          value={parameterQuantity}
                          onChange={(e) => setParameterQuantity(parseInt(e.target.value) || 0)}
                          placeholder="Quantité"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleAddParameter}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>

                    {selectedParameters.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Paramètre</TableHead>
                            <TableHead className="text-right">Prix unitaire</TableHead>
                            <TableHead className="text-right">Quantité</TableHead>
                            <TableHead className="text-right">Sous-total</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedParameters.map((param) => (
                            <TableRow key={param.parameterId}>
                              <TableCell>{param.name}</TableCell>
                              <TableCell className="text-right">
                                {param.price.toLocaleString('fr-FR')} FCFA
                              </TableCell>
                              <TableCell className="text-right">{param.quantity}</TableCell>
                              <TableCell className="text-right font-medium">
                                {(param.price * param.quantity).toLocaleString('fr-FR')} FCFA
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveParameter(param.parameterId)}
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center p-4 bg-gray-50 border rounded-md">
                        <Info className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          Aucun paramètre sélectionné. Veuillez ajouter des paramètres pour les tests en laboratoire.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start space-y-4">
                  <div className="w-full flex justify-between p-4 bg-gray-50 rounded-md">
                    <span className="font-bold">Montant total:</span>
                    <span className="font-bold text-xl text-anor-blue">
                      {totalAmount.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-anor-blue hover:bg-blue-800"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer la note de frais
                    </Button>
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                      Réinitialiser
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>

          {/* Info panel */}
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
              <CardDescription>
                Guide pour le calcul des frais de certification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Frais de gestion du dossier</h4>
                <p className="text-sm text-muted-foreground">
                  Frais administratifs pour le traitement du dossier de certification.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Frais d'inspection et d'échantillonnage</h4>
                <p className="text-sm text-muted-foreground">
                  Coûts liés au déploiement des inspecteurs et au prélèvement d'échantillons.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Frais de surveillance</h4>
                <p className="text-sm text-muted-foreground">
                  Frais pour les activités de surveillance après certification.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Paramètres d'analyse et d'essai</h4>
                <p className="text-sm text-muted-foreground">
                  Coûts des tests spécifiques à effectuer en laboratoire.
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-md mt-6">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Les frais totaux seront automatiquement calculés en fonction des paramètres sélectionnés et des frais fixes.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => window.print()}>
                <Calculator className="mr-2 h-4 w-4" />
                Imprimer une estimation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default FeesCalculationPage;
