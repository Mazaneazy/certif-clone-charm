
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

// Demo inspectors data
const inspectors = [
  { id: 1, name: "Jean Mbarga", specialization: ["Électricité", "Matériaux de construction"] },
  { id: 2, name: "Marie Atangana", specialization: ["Produits alimentaires", "Emballages"] },
  { id: 3, name: "Paul Essono", specialization: ["Produits chimiques", "Matériaux de construction"] },
  { id: 4, name: "Sophie Ndongo", specialization: ["Textiles", "Produits cosmétiques"] },
  { id: 5, name: "Robert Mvondo", specialization: ["Électricité", "Électronique"] },
  { id: 6, name: "Christine Ekondo", specialization: ["Produits alimentaires", "Boissons"] }
];

// Demo certification requests data
const certificationRequests = [
  { id: 101, companyName: "CamerBuild SA", productName: "Ciment Portland", },
  { id: 102, companyName: "FoodPlus Sarl", productName: "Conserves de tomates", },
  { id: 103, companyName: "ElectroCam", productName: "Câbles électriques", },
  { id: 104, companyName: "TextiMode", productName: "Tissus en coton", },
];

interface MissionProgrammingProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const MissionProgramming = ({ onSubmit, onCancel }: MissionProgrammingProps) => {
  const [selectedInspectors, setSelectedInspectors] = useState<number[]>([]);
  const [leadInspector, setLeadInspector] = useState<number | null>(null);
  const [inspectorCommandOpen, setInspectorCommandOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      title: "",
      certificationRequestId: "",
      date: new Date(),
      location: "",
      objective: "",
      inspectorIds: [],
      leadInspectorId: null,
      notes: ""
    }
  });

  const handleSelectInspector = (inspectorId: number) => {
    if (selectedInspectors.includes(inspectorId)) {
      setSelectedInspectors(selectedInspectors.filter(id => id !== inspectorId));
      
      // If removing lead inspector, reset lead inspector
      if (leadInspector === inspectorId) {
        setLeadInspector(null);
      }
    } else {
      setSelectedInspectors([...selectedInspectors, inspectorId]);
    }
  };

  const handleSetLeadInspector = (inspectorId: number) => {
    // Must be in selected inspectors
    if (selectedInspectors.includes(inspectorId)) {
      setLeadInspector(inspectorId);
    }
  };

  const handleSubmit = form.handleSubmit(data => {
    // Add the selected inspectors and lead inspector to the form data
    const formData = {
      ...data,
      inspectorIds: selectedInspectors,
      leadInspectorId: leadInspector
    };
    onSubmit(formData);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de la mission</FormLabel>
              <FormControl>
                <Input placeholder="Inspection annuelle..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certificationRequestId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Demande de certification</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une demande" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {certificationRequests.map(request => (
                    <SelectItem 
                      key={request.id} 
                      value={request.id.toString()}
                    >
                      {request.companyName} - {request.productName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date de la mission</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                  <Input placeholder="Yaoundé, Zone Industrielle..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectif de la mission</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Décrire l'objectif principal de cette mission d'inspection..." 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel className="block mb-2">Sélection des inspecteurs</FormLabel>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Sélectionner les inspecteurs</h3>
                <div className="border rounded-md">
                  <div className="flex gap-2 p-2 flex-wrap">
                    {selectedInspectors.map(id => {
                      const inspector = inspectors.find(i => i.id === id);
                      return (
                        <Badge 
                          key={id} 
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleSelectInspector(id)}
                        >
                          {inspector?.name}
                          {leadInspector === id && (
                            <span className="ml-1 bg-green-200 text-green-800 text-xs rounded-full px-1">
                              Chef
                            </span>
                          )}
                        </Badge>
                      );
                    })}
                    {selectedInspectors.length === 0 && (
                      <span className="text-muted-foreground text-sm">Aucun inspecteur sélectionné</span>
                    )}
                  </div>
                </div>
                <Popover open={inspectorCommandOpen} onOpenChange={setInspectorCommandOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="justify-between w-full mt-2"
                    >
                      Ajouter des inspecteurs
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher un inspecteur..." />
                      <CommandEmpty>Aucun inspecteur trouvé.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {inspectors.map((inspector) => (
                            <CommandItem
                              key={inspector.id}
                              value={inspector.name}
                              onSelect={() => {
                                handleSelectInspector(inspector.id);
                                setInspectorCommandOpen(false);
                              }}
                            >
                              <Checkbox 
                                checked={selectedInspectors.includes(inspector.id)} 
                                className="mr-2"
                              />
                              {inspector.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Désigner le chef de mission</h3>
                {selectedInspectors.length > 0 ? (
                  <ScrollArea className="h-[180px] pr-4">
                    <div className="space-y-2">
                      {selectedInspectors.map(id => {
                        const inspector = inspectors.find(i => i.id === id);
                        return (
                          <div 
                            key={id}
                            className={`flex items-center justify-between p-2 rounded border ${
                              leadInspector === id ? 'border-green-500 bg-green-50' : ''
                            }`}
                          >
                            <div>
                              <div className="font-medium">{inspector?.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {inspector?.specialization.join(', ')}
                              </div>
                            </div>
                            <Button 
                              variant={leadInspector === id ? "default" : "outline"} 
                              size="sm"
                              onClick={() => handleSetLeadInspector(id)}
                              className={leadInspector === id ? "bg-green-600" : ""}
                            >
                              {leadInspector === id ? (
                                <>
                                  <Check className="mr-1 h-4 w-4" /> Sélectionné
                                </>
                              ) : (
                                "Désigner"
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex items-center justify-center h-[180px] text-center text-muted-foreground">
                    <div>
                      <p>Veuillez d'abord sélectionner des inspecteurs</p>
                      <p className="text-sm">Le chef de mission doit être choisi parmi les inspecteurs sélectionnés</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes additionnelles</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Notes complémentaires sur la mission..." 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={selectedInspectors.length === 0 || leadInspector === null}
          >
            Programmer la mission
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MissionProgramming;
