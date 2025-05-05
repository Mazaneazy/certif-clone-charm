
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FeatureType } from '@/components/layout/menus/SupportUtils';

interface SupportFeaturesProps {
  features: FeatureType[];
}

const SupportFeatures: React.FC<SupportFeaturesProps> = ({ features }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {features.map((feature, index) => (
        <AccordionItem key={index} value={`feature-${index}`}>
          <AccordionTrigger className="font-medium">
            {feature.title}
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2 text-gray-700">{feature.description}</p>
            <div className="pl-4 border-l-2 border-gray-200 mt-4">
              <h4 className="text-sm font-medium mb-2">Étapes :</h4>
              <ol className="space-y-1 list-decimal pl-5">
                {feature.steps.map((step, sIndex) => (
                  <li key={sIndex} className="text-sm text-gray-600">{step}</li>
                ))}
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SupportFeatures;
