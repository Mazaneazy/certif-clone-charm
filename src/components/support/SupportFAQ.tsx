
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SupportFAQ: React.FC = () => {
  const faqItems = [
    {
      question: "Comment puis-je retrouver un dossier spécifique ?",
      answer: "Vous pouvez utiliser la barre de recherche en haut de la page \"Demandes\" pour rechercher par nom d'entreprise, nom du promoteur ou numéro de dossier."
    },
    {
      question: "Comment communiquer avec les autres intervenants ?",
      answer: "Vous pouvez utiliser la section commentaires dans les détails de chaque demande. Les commentaires internes ne sont visibles que par le personnel de l'ANOR."
    },
    {
      question: "Comment suivre l'évolution d'un dossier ?",
      answer: "Consultez l'onglet \"Workflow\" dans les détails de la demande pour voir l'état d'avancement, ou l'onglet \"Historique\" pour l'historique complet des actions."
    },
    {
      question: "Comment signaler un problème technique ?",
      answer: "Contactez le support technique par téléphone au +237 222 20 37 46 ou par email à support.technique@anorcameroun.cm."
    },
    {
      question: "Comment modifier mes informations personnelles ?",
      answer: "Accédez à votre profil en cliquant sur votre nom dans la barre latérale, puis utilisez l'option \"Modifier le profil\"."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`faq-${index}`}>
          <AccordionTrigger className="font-medium">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SupportFAQ;
