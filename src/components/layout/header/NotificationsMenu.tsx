
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  title: string;
  read: boolean;
}

const NotificationsMenu = () => {
  const { toast } = useToast();
  const [notifications] = useState<Notification[]>([
    { id: 1, title: 'Nouvelle demande de certification', read: false },
    { id: 2, title: 'Certification ISO 9001 approuvée', read: false },
    { id: 3, title: 'Inspection planifiée pour demain', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    toast({
      title: "Notification",
      description: "Toutes les notifications ont été marquées comme lues.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative focus-visible-ring" 
          aria-label={`Notifications - ${unreadCount} non lues`}
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 bg-anor-blue"
              variant="secondary"
            >
              <span className="sr-only">{unreadCount} notifications non lues</span>
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-4 py-2 font-medium">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto text-xs text-anor-blue hover:text-anor-blue hover:bg-blue-50"
              aria-label="Marquer toutes les notifications comme lues"
              onClick={handleMarkAllAsRead}
            >
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
                !notification.read ? 'bg-blue-50 text-anor-blue' : ''
              }`}
            >
              <div className="text-sm font-medium">{notification.title}</div>
              <div className="text-xs text-muted-foreground">Il y a 30 min</div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-anor-blue" asChild>
          <Link to="/notifications" aria-label="Voir toutes les notifications">Voir toutes les notifications</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
