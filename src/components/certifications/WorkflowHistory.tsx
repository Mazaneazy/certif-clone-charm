
import React from 'react';
import { WorkflowHistoryEntry } from '@/types/auth';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface WorkflowHistoryProps {
  history: WorkflowHistoryEntry[];
}

const WorkflowHistory: React.FC<WorkflowHistoryProps> = ({ history }) => {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getStatusName = (status: string): string => {
    const statusMap: Record<string, string> = {
      'reception': 'Réception',
      'evaluation_preliminary': 'Évaluation préliminaire',
      'technical_review': 'Revue technique',
      'inspection_planning': 'Inspection sur site',
      'laboratory_testing': 'Tests en laboratoire',
      'evaluation_final': 'Évaluation finale',
      'decision_committee': 'Décision du comité',
      'certification_issuance': 'Émission du certificat',
      'completed': 'Certification complétée'
    };
    
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      'reception': 'bg-gray-100',
      'evaluation_preliminary': 'bg-blue-50',
      'technical_review': 'bg-indigo-50',
      'inspection_planning': 'bg-purple-50',
      'laboratory_testing': 'bg-amber-50',
      'evaluation_final': 'bg-cyan-50',
      'decision_committee': 'bg-orange-50',
      'certification_issuance': 'bg-green-50',
      'completed': 'bg-green-100'
    };
    
    return colorMap[status] || 'bg-gray-50';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Historique du processus</h3>
      
      <div className="space-y-4">
        {sortedHistory.map((entry, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${getStatusColor(entry.status)}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{getStatusName(entry.status)}</span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(entry.date), { 
                  addSuffix: true, 
                  locale: fr 
                })}
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm">{entry.comment}</p>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Par {entry.user} • {new Date(entry.date).toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
        
        {history.length === 0 && (
          <div className="text-center p-4 text-gray-500">
            Aucun historique disponible.
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowHistory;
