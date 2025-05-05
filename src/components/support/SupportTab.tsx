
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleName, getRoleFeatures } from '@/components/layout/menus/SupportUtils';
import SupportFeatures from './SupportFeatures';
import SupportWorkflow from './SupportWorkflow';
import SupportFAQ from './SupportFAQ';
import { useToast } from '@/hooks/use-toast';

interface SupportTabProps {
  isOpen: boolean;
}

const SupportTab: React.FC<SupportTabProps> = ({ isOpen }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('features');

  const handleDownloadGuide = () => {
    toast({
      title: "Téléchargement en cours",
      description: "Le guide utilisateur sera bientôt disponible au téléchargement.",
      duration: 3000,
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Contacter le support",
      description: "Votre demande a été envoyée à l'équipe de support.",
      duration: 3000,
    });
  };

  if (!isOpen || !user) return null;

  const roleFeatures = getRoleFeatures(user.role);
  const roleName = getRoleName(user.role);

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <CardTitle>Support et Aide</CardTitle>
        </div>
        <CardDescription>
          Informations et guides pour le profil <strong>{roleName}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="features" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
            <TabsTrigger value="workflow">Flux de travail</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-4">
            <SupportFeatures features={roleFeatures} />
          </TabsContent>
          
          <TabsContent value="workflow" className="mt-4">
            <SupportWorkflow />
          </TabsContent>
          
          <TabsContent value="faq" className="mt-4">
            <SupportFAQ />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-end gap-2">
        <Button variant="outline" onClick={handleDownloadGuide}>
          Télécharger le guide
        </Button>
        <Button variant="ghost" onClick={handleContactSupport}>
          Contacter le support
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupportTab;
