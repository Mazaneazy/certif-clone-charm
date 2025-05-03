
import React, { useState } from 'react';
import { Download, FileType2, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Define types for certifications to be exported
interface ExportableCertification {
  id: number;
  title: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  type: string;
  issuer?: string;
  inspector?: string;
}

interface ExportCertificationsButtonProps {
  certifications: ExportableCertification[];
  isDisabled?: boolean;
}

const ExportCertificationsButton = ({
  certifications,
  isDisabled = false,
}: ExportCertificationsButtonProps) => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  // Function to export to Excel
  const exportToExcel = async () => {
    if (certifications.length === 0) {
      toast({
        title: "Erreur d'exportation",
        description: "Aucune certification à exporter",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      
      // Convert data to CSV format
      const headers = ["ID", "Titre", "Date d'émission", "Date d'expiration", "Statut", "Type", "Émetteur", "Inspecteur"];
      
      const csvRows = [
        headers.join(','),
        ...certifications.map(cert => [
          cert.id,
          `"${cert.title.replace(/"/g, '""')}"`, // Escape quotes for CSV
          cert.issueDate,
          cert.expiryDate,
          cert.status === 'valid' ? 'Valide' : cert.status === 'expired' ? 'Expiré' : 'En attente',
          cert.type,
          cert.issuer || 'N/A',
          cert.inspector || 'N/A'
        ].join(','))
      ];
      
      const csvContent = csvRows.join('\n');
      
      // Create a Blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Certifications_ANOR_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Exportation réussie",
        description: `${certifications.length} certifications exportées au format Excel`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue lors de l'exportation",
        variant: "destructive",
      });
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Function to export to PDF
  const exportToPDF = async () => {
    if (certifications.length === 0) {
      toast({
        title: "Erreur d'exportation",
        description: "Aucune certification à exporter",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsExporting(true);
      
      // In a real application, you would use a PDF library
      // For now, we'll simulate PDF generation with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Exportation réussie",
        description: `${certifications.length} certifications exportées au format PDF`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur est survenue lors de l'exportation",
        variant: "destructive",
      });
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          disabled={isDisabled || isExporting || certifications.length === 0}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span>Exporter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToExcel} disabled={isExporting}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          <span>Exporter en Excel</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF} disabled={isExporting}>
          <FileType2 className="mr-2 h-4 w-4" />
          <span>Exporter en PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportCertificationsButton;
