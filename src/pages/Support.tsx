
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import SupportTab from '@/components/support/SupportTab';
import { Separator } from '@/components/ui/separator';
import SupportContactCard from '@/components/support/SupportContactCard';
import SupportDocumentationCard from '@/components/support/SupportDocumentationCard';

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
            <SupportContactCard />
            <SupportDocumentationCard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Support;
