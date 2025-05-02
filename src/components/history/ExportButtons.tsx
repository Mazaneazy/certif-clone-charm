
import React from 'react';
import { FileText, FileOutput } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ExportButtons: React.FC = () => {
  const { toast } = useToast();

  const handleExportCSV = () => {
    toast({
      title: "Export CSV initié",
      description: "Votre fichier CSV est en cours de génération.",
    });
    // Mock implementation - in real app this would create and trigger download of a CSV file
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF initié",
      description: "Votre fichier PDF est en cours de génération.",
    });
    // Mock implementation - in real app this would create and trigger download of a PDF file
  };

  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-1" 
              onClick={handleExportCSV}
              aria-label="Exporter au format CSV"
            >
              <FileOutput className="h-4 w-4" />
              <span className="hidden sm:inline">Exporter CSV</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Exporter au format CSV</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleExportPDF}
              aria-label="Exporter au format PDF"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Exporter PDF</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Exporter au format PDF</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ExportButtons;
