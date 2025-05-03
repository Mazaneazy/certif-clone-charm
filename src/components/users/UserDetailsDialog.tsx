
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Briefcase, ShieldCheck } from "lucide-react";
import { getInitials, getRoleDescription, getStatusBadge, getPermissionsList } from './UserUtils';
import { useToast } from '@/hooks/use-toast';

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  lastActive: string;
  status: string;
  avatar: string;
}

interface UserDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType | null;
}

const UserDetailsDialog = ({ isOpen, onOpenChange, user }: UserDetailsDialogProps) => {
  const { toast } = useToast();

  if (!user) return null;

  const handleModifyUser = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La modification des utilisateurs sera bientôt disponible.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Détails de l'utilisateur</DialogTitle>
          <DialogDescription>
            Informations concernant l'utilisateur et ses permissions
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center mt-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                  <span>{user.department}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Type d'utilisateur</div>
                <div className="font-medium mt-0.5">{getRoleDescription(user.role)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Statut</div>
                <div className="font-medium mt-0.5">{getStatusBadge(user.status)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Dernière activité</div>
                <div className="font-medium mt-0.5">{new Date(user.lastActive).toLocaleDateString('fr-FR')}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">ID utilisateur</div>
                <div className="font-medium mt-0.5">{user.id}</div>
              </div>
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex items-center mb-2">
                <ShieldCheck className="h-4 w-4 mr-1.5 text-blue-600" />
                <div className="font-medium">Permissions</div>
              </div>
              <div className="mt-2 space-y-1">
                {getPermissionsList(user.role).map((permission, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Badge variant="outline" className="bg-gray-50">
                      {permission === '*' ? 'Toutes les permissions' : permission}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
            <Button size="sm" className="bg-anor-blue hover:bg-blue-800" onClick={handleModifyUser}>
              Modifier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
