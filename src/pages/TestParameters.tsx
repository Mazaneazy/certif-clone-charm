
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { TestParameter } from '@/types/auth';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom du paramètre doit comporter au moins 2 caractères",
  }),
  price: z.string().refine((val) => {
    const price = parseFloat(val);
    return !isNaN(price) && price >= 0;
  }, {
    message: "Le prix doit être un nombre valide et positif",
  }),
  description: z.string().optional(),
});

const TestParameters = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentParameter, setCurrentParameter] = useState<TestParameter | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [parameterToDelete, setParameterToDelete] = useState<TestParameter | null>(null);

  // Démonstration de paramètres de test
  const [parameters, setParameters] = useState<TestParameter[]>([
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
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  const handleAddParameter = () => {
    setIsEditing(false);
    setCurrentParameter(null);
    form.reset({
      name: "",
      price: "",
      description: "",
    });
    setDialogOpen(true);
  };

  const handleEditParameter = (parameter: TestParameter) => {
    setIsEditing(true);
    setCurrentParameter(parameter);
    form.reset({
      name: parameter.name,
      price: parameter.price.toString(),
      description: parameter.description || "",
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = (parameter: TestParameter) => {
    setParameterToDelete(parameter);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (parameterToDelete) {
      // Supprimer le paramètre
      setParameters(parameters.filter(p => p.id !== parameterToDelete.id));
      toast({
        title: "Paramètre supprimé",
        description: `Le paramètre "${parameterToDelete.name}" a été supprimé.`,
      });
      setDeleteConfirmOpen(false);
      setParameterToDelete(null);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    setTimeout(() => {
      if (isEditing && currentParameter) {
        // Mise à jour d'un paramètre existant
        const updatedParameters = parameters.map(p => 
          p.id === currentParameter.id 
            ? { 
                ...p, 
                name: values.name, 
                price: parseFloat(values.price), 
                description: values.description 
              } 
            : p
        );
        setParameters(updatedParameters);
        toast({
          title: "Paramètre mis à jour",
          description: `Le paramètre "${values.name}" a été mis à jour avec succès.`,
        });
      } else {
        // Création d'un nouveau paramètre
        const newParameter: TestParameter = {
          id: Math.max(0, ...parameters.map(p => p.id)) + 1,
          name: values.name,
          price: parseFloat(values.price),
          description: values.description,
        };
        setParameters([...parameters, newParameter]);
        toast({
          title: "Paramètre ajouté",
          description: `Le paramètre "${values.name}" a été ajouté avec succès.`,
        });
      }

      setIsSubmitting(false);
      setDialogOpen(false);
      form.reset();
    }, 500);
  };

  return (
    <AppLayout requiredPermission="manage_test_parameters">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paramètres de Test</h1>
            <p className="text-muted-foreground">Gestion des paramètres d'analyse et d'essai en laboratoire</p>
          </div>
          <Button 
            onClick={handleAddParameter}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Ajouter un paramètre</span>
          </Button>
        </div>

        {parameters.length > 0 ? (
          <div className="border rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Paramètre</TableHead>
                  <TableHead>Prix (FCFA)</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parameters.map((param) => (
                  <TableRow key={param.id}>
                    <TableCell className="font-medium">{param.id}</TableCell>
                    <TableCell>{param.name}</TableCell>
                    <TableCell>{param.price.toLocaleString('fr-FR')}</TableCell>
                    <TableCell className="hidden md:table-cell">{param.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditParameter(param)}
                          className="h-8 w-8 p-0"
                          title="Modifier le paramètre"
                        >
                          <span className="sr-only">Modifier</span>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(param)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          title="Supprimer le paramètre"
                        >
                          <span className="sr-only">Supprimer</span>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="border rounded-lg bg-white p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Aucun paramètre défini</h3>
            <p className="text-muted-foreground mb-6">
              Aucun paramètre de test n'a encore été défini.
            </p>
            <Button onClick={handleAddParameter}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un paramètre
            </Button>
          </div>
        )}
      </div>

      {/* Dialog for adding/editing parameters */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifier le paramètre" : "Ajouter un paramètre"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Modifiez les détails du paramètre de test." 
                : "Définissez un nouveau paramètre pour les analyses en laboratoire."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du paramètre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: pH, Conductivité" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nom du paramètre à mesurer
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (FCFA)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="500" {...field} />
                    </FormControl>
                    <FormDescription>
                      Coût de l'analyse en FCFA
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description du paramètre et de sa méthode d'analyse"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : isEditing ? (
                    "Mettre à jour"
                  ) : (
                    "Ajouter"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog for deletion */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce paramètre ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default TestParameters;
