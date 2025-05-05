
import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

const SupportContactCard: React.FC = () => {
  const { toast } = useToast();
  
  const handleContactSupport = () => {
    toast({
      title: "Demande envoyée",
      description: "Un membre de notre équipe support vous contactera bientôt.",
      duration: 5000,
    });
  };
  
  const handleViewFAQ = () => {
    // Scroll to FAQ section
    const faqTab = document.querySelector('[data-state="active"][data-value="faq"]');
    if (faqTab) {
      faqTab.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not already on FAQ tab, activate it
      const tabTrigger = document.querySelector('[data-value="faq"]');
      if (tabTrigger && tabTrigger instanceof HTMLElement) {
        tabTrigger.click();
      }
    }
  };

  return (
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
          <Button onClick={handleContactSupport}>
            Contacter le support
          </Button>
          <Button variant="outline" onClick={handleViewFAQ}>
            Consulter la FAQ
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SupportContactCard;
