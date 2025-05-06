
import React from 'react';
import { Circle, CircleCheck, CircleHelp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

interface SupportTicketProps {
  ticket: Ticket;
  onView?: (id: string) => void;
}

const SupportTicket: React.FC<SupportTicketProps> = ({ ticket, onView }) => {
  const { toast } = useToast();

  const handleViewTicket = () => {
    if (onView) {
      onView(ticket.id);
    } else {
      toast({
        title: "Information",
        description: "La visualisation détaillée des tickets sera bientôt disponible.",
      });
    }
  };

  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'open':
        return <Circle className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <CircleHelp className="h-4 w-4 text-blue-500" />;
      case 'resolved':
        return <CircleCheck className="h-4 w-4 text-green-500" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (ticket.status) {
      case 'open':
        return 'Ouvert';
      case 'in_progress':
        return 'En cours';
      case 'resolved':
        return 'Résolu';
      default:
        return 'Inconnu';
    }
  };
  
  const getStatusColor = () => {
    switch (ticket.status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityColor = () => {
    switch (ticket.priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityText = () => {
    switch (ticket.priority) {
      case 'low':
        return 'Basse';
      case 'medium':
        return 'Moyenne';
      case 'high':
        return 'Haute';
      default:
        return 'Inconnue';
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{ticket.title}</CardTitle>
          <Badge className={getStatusColor()}>
            <span className="flex items-center gap-1">
              {getStatusIcon()} {getStatusText()}
            </span>
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          Ticket #{ticket.id} · Créé le {ticket.createdAt.toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm line-clamp-2 mb-3">{ticket.description}</p>
        <div className="flex justify-between items-center">
          <Badge className={getPriorityColor()}>{getPriorityText()}</Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleViewTicket}
            className="text-xs"
          >
            Voir les détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportTicket;
