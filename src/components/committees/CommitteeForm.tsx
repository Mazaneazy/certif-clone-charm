
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CommitteeMember, TechnicalCommittee } from '@/types/committee';
import { getCommitteeMembers, createCommittee, updateCommittee } from '@/services/committeeService';

// Type pour les props du formulaire
interface CommitteeFormProps {
  initialData: TechnicalCommittee | null;
  onSuccess: () => void;
  onCancel: () => void;
}

// Définir le schéma de validation avec Zod
const committeeSchema = z.object({
  name: z.string().min(5, 'Le nom du comité est obligatoire et doit contenir au moins 5 caractères'),
  purpose: z.string().min(10, 'La description de l\'objectif est obligatoire et doit contenir au moins 10 caractères'),
  chiefId: z.number().min(1, 'Le chef du comité est obligatoire'),
  memberIds: z.array(z.number()).min(1, 'Au moins un membre doit être sélectionné'),
  memberRoles: z.record(z.string().optional())
});

type CommitteeFormValues = z.infer<typeof committeeSchema>;

const CommitteeForm: React.FC<CommitteeFormProps> = ({ initialData, onSuccess, onCancel }) => {
  const [committeeMembers] = React.useState<CommitteeMember[]>(getCommitteeMembers());
  
  // Convertir les données initiales au format du formulaire
  const defaultValues: CommitteeFormValues = initialData 
    ? {
        name: initialData.name,
        purpose: initialData.purpose,
        chiefId: initialData.chief.id,
        memberIds: initialData.members.map(m => m.id),
        memberRoles: initialData.members.reduce((acc, member) => {
          if (member.role) {
            acc[member.id] = member.role;
          }
          return acc;
        }, {} as Record<number, string>)
      }
    : {
        name: '',
        purpose: '',
        chiefId: 0,
        memberIds: [],
        memberRoles: {}
      };

  const form = useForm<CommitteeFormValues>({
    resolver: zodResolver(committeeSchema),
    defaultValues
  });

  // Gérer la soumission du formulaire
  const onSubmit = (data: CommitteeFormValues) => {
    try {
      const chief = committeeMembers.find(m => m.id === data.chiefId);
      if (!chief) throw new Error("Chef de comité non trouvé");
      
      const members = data.memberIds
        .map(id => {
          const member = committeeMembers.find(m => m.id === id);
          if (member) {
            return {
              ...member,
              role: data.memberRoles[id] || undefined
            };
          }
          return null;
        })
        .filter(Boolean) as CommitteeMember[];
      
      if (initialData) {
        // Mise à jour d'un comité existant
        updateCommittee(initialData.id, {
          name: data.name,
          purpose: data.purpose,
          chief: { ...chief, isChief: true },
          members,
        });
      } else {
        // Création d'un nouveau comité
        createCommittee({
          name: data.name,
          purpose: data.purpose,
          chief: { ...chief, isChief: true },
          members,
          creationDate: new Date().toISOString(),
          status: 'draft'
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du comité:", error);
    }
  };

  // Filtrer les membres déjà sélectionnés pour éviter les doublons
  const availableMembers = React.useMemo(() => {
    const chiefId = form.watch('chiefId');
    return committeeMembers.filter(member => member.id !== chiefId);
  }, [committeeMembers, form.watch('chiefId')]);
  
  const selectedMemberIds = form.watch('memberIds');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du comité</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Comité d'évaluation des produits alimentaires" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectif du comité</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Décrivez le but et les responsabilités du comité..." 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chiefId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chef du comité</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value))} 
                value={field.value ? field.value.toString() : ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le chef du comité" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {committeeMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name} - {member.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memberIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membres du comité</FormLabel>
              <div className="border rounded-md p-4 space-y-4">
                {availableMembers.map(member => (
                  <div key={member.id} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id={`member-${member.id}`}
                      className="mt-1"
                      value={member.id}
                      checked={field.value.includes(member.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const value = member.id;
                        const newValues = checked
                          ? [...field.value, value]
                          : field.value.filter(id => id !== value);
                        field.onChange(newValues);
                      }}
                    />
                    <div className="flex-1">
                      <label htmlFor={`member-${member.id}`} className="text-sm font-medium">
                        {member.name}
                      </label>
                      <p className="text-xs text-muted-foreground">{member.specialization.join(", ")}</p>
                      
                      {field.value.includes(member.id) && (
                        <Controller
                          name={`memberRoles.${member.id}`}
                          control={form.control}
                          render={({ field: roleField }) => (
                            <Input
                              className="mt-2 text-sm"
                              placeholder="Rôle dans le comité (optionnel)"
                              {...roleField}
                            />
                          )}
                        />
                      )}
                    </div>
                  </div>
                ))}
                {availableMembers.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Tous les membres sont déjà assignés ou le chef de comité doit d'abord être sélectionné.
                  </p>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            {initialData ? 'Mettre à jour le comité' : 'Créer le comité'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommitteeForm;
