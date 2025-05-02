
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from '@/components/ui/sidebar';

const AppHeader = () => {
  const { user, logout } = useAuth();
  const { collapsed, setCollapsed } = useSidebar();
  const [notifications] = useState([
    { id: 1, title: 'Nouvelle demande de certification', read: false },
    { id: 2, title: 'Certification ISO 9001 approuvée', read: false },
    { id: 3, title: 'Inspection planifiée pour demain', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Extraire les initiales de l'utilisateur pour l'avatar
  const getInitials = () => {
    if (!user) return 'U';
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
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 bg-red-500"
                  variant="secondary"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 font-medium">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-auto text-xs">
                  Marquer tout comme lu
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
                Aucune notification
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex cursor-pointer flex-col items-start px-4 py-2 ${
                    !notification.read ? 'bg-muted/50' : ''
                  }`}
                >
                  <div className="text-sm font-medium">{notification.title}</div>
                  <div className="text-xs text-muted-foreground">Il y a 30 min</div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center" asChild>
              <Link to="/notifications">Voir toutes les notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 flex items-center gap-2 pl-2 pr-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start text-left">
                  <span className="text-sm font-medium leading-none">{user.name}</span>
                  <span className="text-xs text-muted-foreground leading-none mt-1">
                    {roleLabels[user.role] || user.role}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
                <Link className="flex w-full cursor-pointer items-center" to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="flex w-full cursor-pointer items-center" to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
