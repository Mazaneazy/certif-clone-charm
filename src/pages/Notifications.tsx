
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Bell, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const { toast } = useToast();
  const [notifications] = React.useState([
    { id: 1, title: 'Nouvelle demande de certification', message: 'Une nouvelle demande de certification a été soumise par Entreprise ABC.', date: '2025-05-01', read: false },
    { id: 2, title: 'Certification ISO 9001 approuvée', message: 'La certification ISO 9001 pour Entreprise XYZ a été approuvée.', date: '2025-04-30', read: false },
    { id: 3, title: 'Inspection planifiée pour demain', message: 'Rappel: Une inspection est planifiée pour demain à 10h chez Entreprise DEF.', date: '2025-04-29', read: true },
    { id: 4, title: 'Paiement reçu', message: 'Un paiement de 150 000 FCFA a été reçu de la part de Entreprise GHI.', date: '2025-04-28', read: true },
    { id: 5, title: 'Certificat expiré', message: 'Le certificat HACCP de Entreprise JKL a expiré. Une notification a été envoyée au client.', date: '2025-04-27', read: true },
  ]);

  const handleMarkAllAsRead = () => {
    toast({
      title: "Notification",
      description: "Toutes les notifications ont été marquées comme lues.",
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 
                ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                : 'Toutes les notifications ont été lues'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} className="flex items-center gap-2 self-start sm:self-auto">
              <Check className="h-4 w-4" />
              <span>Tout marquer comme lu</span>
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
            <div className="text-center">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucune notification</h3>
              <p className="mt-1 text-sm text-gray-500">Vous n'avez pas de notifications pour le moment</p>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <div className={`flex flex-col p-4 ${!notification.read ? 'bg-muted/50' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">{notification.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex justify-end mt-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        Marquer comme lu
                      </Button>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default Notifications;
