
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
  code: z.string().min(2, {
    message: "Le code doit contenir au moins 2 caractères.",
  }),
  title: z.string().min(5, {
    message: "Le titre doit contenir au moins 5 caractères.",
  }),
  category: z.string().min(2, {
    message: "La catégorie doit contenir au moins 2 caractères.",
  }),
  publishDate: z.string().min(1, {
    message: "La date de publication est requise.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddStandardFormProps {
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

const AddStandardForm: React.FC<AddStandardFormProps> = ({ onSubmit, onCancel }) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      title: "",
      category: "",
      publishDate: new Date().toISOString().split('T')[0],
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code de la norme</FormLabel>
              <FormControl>
                <Input placeholder="NF EN 12345" {...field} />
              </FormControl>
              <FormDescription>
                Exemple: NF EN 12345, ISO 9001
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre de la norme" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Input placeholder="Électrique, Mécanique, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="publishDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de publication</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
                  placeholder="Description détaillée de la norme"
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
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddStandardForm;
