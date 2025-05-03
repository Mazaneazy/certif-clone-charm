
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Le titre doit contenir au moins 5 caractères.",
  }),
  company: z.string().min(2, {
    message: "Le nom de l'entreprise doit contenir au moins 2 caractères.",
  }),
  location: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
  date: z.string().min(1, {
    message: "La date est requise.",
  }),
  inspectorName: z.string().min(2, {
    message: "Le nom de l'inspecteur doit contenir au moins 2 caractères.",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddInspectionFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

const AddInspectionForm: React.FC<AddInspectionFormProps> = ({ onSubmit, onCancel }) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      date: new Date().toISOString().split('T')[0],
      inspectorName: "",
      notes: "",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de l'inspection</FormLabel>
              <FormControl>
                <Input placeholder="Inspection annuelle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entreprise</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'entreprise" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu</FormLabel>
              <FormControl>
                <Input placeholder="Adresse complète" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date prévue</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="inspectorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inspecteur assigné</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'inspecteur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Notes additionnelles"
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
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Planifier
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddInspectionForm;
