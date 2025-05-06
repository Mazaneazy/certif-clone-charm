
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  } | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { logout } = useAuth();

  if (!user) return null;

  // Extraire les initiales de l'utilisateur pour l'avatar
  const getInitials = () => {
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const roleLabels: Record<string, string> = {
    admin: 'Administrateur',
    gestionnaire: 'Gestionnaire',
    inspecteur: 'Inspecteur',
    responsable_technique: 'Responsable Technique',
    directeur: 'Directeur',
    comptable: 'Comptable',
    producteur: 'Producteur'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-8 flex items-center gap-2 pl-2 pr-1 focus-visible-ring"
          aria-label="Menu utilisateur"
        >
          <Avatar className="h-8 w-8 border border-primary/10">
            <AvatarImage src={user.avatar} alt={`Photo de profil de ${user.name}`} />
            <AvatarFallback className="bg-anor-blue text-white">{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col items-start text-left">
            <span className="text-sm font-medium leading-none">{user.name}</span>
            <span className="text-xs text-muted-foreground leading-none mt-1">
              {roleLabels[user.role] || user.role}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            className="flex w-full cursor-pointer items-center" 
            to="/profile"
            aria-label="Accéder à votre profil"
          >
            <User className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            className="flex w-full cursor-pointer items-center" 
            to="/settings"
            aria-label="Accéder aux paramètres"
          >
            <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onSelect={() => logout()}
          aria-label="Se déconnecter"
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
