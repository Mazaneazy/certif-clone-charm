
import React from 'react';
import ExportButtons from './ExportButtons';

interface HistoryHeaderProps {
  title: string;
  description: string;
}

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-anor-blue">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <ExportButtons />
    </div>
  );
};

export default HistoryHeader;
