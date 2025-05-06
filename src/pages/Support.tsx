
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SupportTab from '@/components/support/SupportTab';
import SupportContactCard from '@/components/support/SupportContactCard';
import SupportDocumentationCard from '@/components/support/SupportDocumentationCard';
import SupportTicketList from '@/components/support/SupportTicketList';
import ChatSupport from '@/components/support/ChatSupport';

const Support = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('help');

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Support et Aide</h2>
            <p className="text-muted-foreground">
              Consultez les informations d'aide et contactez le support technique.
            </p>
          </div>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="help" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="help">Guide d'aide</TabsTrigger>
            <TabsTrigger value="tickets">Mes tickets</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="help" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <SupportTab isOpen={true} />
              </div>
              
              <div className="space-y-4">
                <SupportContactCard />
                <SupportDocumentationCard />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tickets" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes tickets de support</CardTitle>
                    <CardDescription>
                      Suivez l'état de vos demandes d'assistance technique
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <SupportTicketList />
                  </div>
                </Card>
              </div>
              
              <div className="space-y-4">
                <SupportContactCard />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Ressources et documentation</CardTitle>
                    <CardDescription>
                      Accédez à toutes les ressources nécessaires pour utiliser la plateforme
                    </CardDescription>
                  </CardHeader>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Documentation cards would go here */}
                      <Card className="p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="font-medium mb-2">Guide de l'utilisateur</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Documentation complète sur l'utilisation de la plateforme ANOR
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Télécharger (PDF, 2.4MB)
                        </Button>
                      </Card>
                      
                      <Card className="p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="font-medium mb-2">Procédures de certification</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Guide détaillé des étapes et exigences du processus de certification
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Télécharger (PDF, 1.8MB)
                        </Button>
                      </Card>
                      
                      <Card className="p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="font-medium mb-2">Tutoriels vidéo</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Série de vidéos explicatives sur l'utilisation des fonctionnalités
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Voir les vidéos
                        </Button>
                      </Card>
                      
                      <Card className="p-4 hover:bg-gray-50 transition-colors">
                        <h3 className="font-medium mb-2">FAQ</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Réponses aux questions fréquemment posées
                        </p>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('help')}>
                          Consulter la FAQ
                        </Button>
                      </Card>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-4">
                <SupportDocumentationCard />
                <SupportContactCard />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add the chat support widget */}
      <ChatSupport />
    </AppLayout>
  );
};

export default Support;
