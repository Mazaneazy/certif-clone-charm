
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExportCertificationsButton from '@/components/certifications/ExportCertificationsButton';

interface CertificationHeaderProps {
  filteredCertifications: Array<{
    id: number;
    title: string;
    issueDate: string;
    expiryDate: string;
    status: string;
    type: string;
    issuer?: string;
    inspector?: string;
  }>;
  onCreateCertification: () => void;
}

const CertificationHeader: React.FC<CertificationHeaderProps> = ({
  filteredCertifications,
  onCreateCertification,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Certifications</h1>
        <p className="text-muted-foreground">Gestion des certifications et standards.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <ExportCertificationsButton 
          certifications={filteredCertifications}
          isDisabled={filteredCertifications.length === 0}
        />
        <Button onClick={onCreateCertification} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto">
          <PlusCircle className="h-4 w-4" />
          <span>Nouvelle certification</span>
        </Button>
      </div>
    </div>
  );
};

export default CertificationHeader;
