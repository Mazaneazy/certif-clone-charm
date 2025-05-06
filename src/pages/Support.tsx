import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button'; // Add this import
import SupportTicketList from '@/components/support/SupportTicketList';
import SupportCreateTicket from '@/components/support/SupportCreateTicket';
import SupportTab from '@/components/support/SupportTab';
import SupportContactCard from '@/components/support/SupportContactCard';
import SupportDocumentationCard from '@/components/support/SupportDocumentationCard';
import ChatSupport from '@/components/support/ChatSupport';

const Support: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Support Tickets</h1>
                <Button onClick={() => setOpen(true)}>Create Ticket</Button>
              </div>
              <SupportTicketList />
            </CardContent>
          </Card>
        </div>

        <div>
          <SupportContactCard />
          <SupportDocumentationCard />
        </div>
      </div>

      <SupportCreateTicket isOpen={open} onClose={() => setOpen(false)} />
      <SupportTab isOpen={true} />
      <ChatSupport />
    </div>
  );
};

export default Support;
