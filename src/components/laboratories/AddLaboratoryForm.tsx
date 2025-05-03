
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  specialization: z.string().min(2, {
    message: "La spécialisation doit contenir au moins 2 caractères.",
  }),
  accreditation: z.string().optional(),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddLaboratoryFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

const AddLaboratoryForm: React.FC<AddLaboratoryFormProps> = ({ onSubmit, onCancel }) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      specialization: "",
      accreditation: "",
      address: "",
      description: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du laboratoire</FormLabel>
              <FormControl>
                <Input placeholder="Laboratoire National" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@laboratoire.fr" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spécialisation</FormLabel>
              <FormControl>
                <Input placeholder="Tests mécaniques et électriques" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="accreditation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accréditation</FormLabel>
              <FormControl>
                <Input placeholder="ISO/IEC 17025" {...field} />
              </FormControl>
              <FormDescription>
                Exemple: ISO/IEC 17025, ISO 9001
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="123 Rue du Laboratoire, 75001 Paris" {...field} />
              </FormControl>
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
                  placeholder="Description des services et capacités du laboratoire"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" className="bg-anor-blue hover:bg-anor-blue/90">
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddLaboratoryForm;
