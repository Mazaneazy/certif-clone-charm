
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SupportTicket, { Ticket } from './SupportTicket';
import SupportCreateTicket from './SupportCreateTicket';

// Sample data for tickets
const sampleTickets: Ticket[] = [
  {
    id: 'TICK-001',
    title: 'Problème de connexion au système',
    description: 'Je ne parviens pas à me connecter au système depuis ce matin. J\'ai essayé de réinitialiser mon mot de passe mais je ne reçois pas l\'email de réinitialisation.',
    status: 'open',
    priority: 'high',
    createdAt: new Date(2023, 4, 15),
    updatedAt: new Date(2023, 4, 15)
  },
  {
    id: 'TICK-002',
    title: 'Question sur le processus de certification',
    description: 'J\'aimerais avoir plus d\'informations sur le processus de certification des produits électroniques. Quels documents dois-je fournir ?',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date(2023, 4, 10),
    updatedAt: new Date(2023, 4, 12)
  },
  {
    id: 'TICK-003',
    title: 'Erreur d\'affichage des rapports',
    description: 'Les graphiques ne s\'affichent pas correctement dans la section rapports. J\'utilise Chrome version 98.',
    status: 'resolved',
    priority: 'low',
    createdAt: new Date(2023, 3, 28),
    updatedAt: new Date(2023, 4, 5)
  }
];

const SupportTicketList: React.FC = () => {
  const [tickets] = useState<Ticket[]>(sampleTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <div className="flex-1">
          <Input
            placeholder="Rechercher un ticket..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex gap-2">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="open">Ouvert</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="resolved">Résolu</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <SupportTicket key={ticket.id} ticket={ticket} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-md">
            <p className="text-muted-foreground mb-2">Aucun ticket ne correspond à votre recherche</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>

      <SupportCreateTicket 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default SupportTicketList;
