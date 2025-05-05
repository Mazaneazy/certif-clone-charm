
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import SupportTab from '@/components/support/SupportTab';
import { FileText, HelpCircle, Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Support = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('features');

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight">Support et Aide</h2>
            <p className="text-muted-foreground">
              Consultez les informations d'aide et contactez le support technique.
            </p>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SupportTab isOpen={true} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <CardTitle>Besoin d'aide ?</CardTitle>
                </div>
                <CardDescription>
                  Contactez notre équipe de support technique
                </CardDescription>
              </CardHeader>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Assistance téléphonique</div>
                    <div className="text-sm text-gray-500">+237 222 20 37 46</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Email support</div>
                    <div className="text-sm text-gray-500">support.technique@anorcameroun.cm</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Chat en ligne</div>
                    <div className="text-sm text-gray-500">Disponible 8h-16h du lundi au vendredi</div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col space-y-2">
                  <Button>
                    Contacter le support
                  </Button>
                  <Button variant="outline">
                    Consulter la FAQ
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <CardTitle>Documentation</CardTitle>
                </div>
                <CardDescription>
                  Ressources et guides d'utilisation
                </CardDescription>
              </CardHeader>
              <div className="p-6 space-y-3">
                <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">Guide de l'utilisateur</div>
                  <div className="text-sm text-gray-500">Manuel complet du système</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">Procédures de certification</div>
                  <div className="text-sm text-gray-500">Processus et exigences</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">Tarification</div>
                  <div className="text-sm text-gray-500">Grille tarifaire des services</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Support;
