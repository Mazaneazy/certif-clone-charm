
import { WorkflowStep, WorkflowStatus, WorkflowAction } from '@/types/workflow';

// Actions disponibles dans le workflow
export const workflowActions: WorkflowAction[] = [
  {
    id: 'start_evaluation',
    name: 'Démarrer l\'évaluation',
    description: 'Commencer l\'évaluation de la demande',
    availableInStatus: ['reception'],
    nextStatus: 'evaluation_preliminary',
    requiresComment: false
  },
  {
    id: 'request_additional_info',
    name: 'Demander des compléments',
    description: 'Demander des informations supplémentaires au demandeur',
    availableInStatus: ['reception', 'evaluation_preliminary', 'technical_review'],
    nextStatus: 'reception',
    requiresComment: true
  },
  {
    id: 'approve_preliminary',
    name: 'Valider l\'évaluation préliminaire',
    description: 'Passer à la revue technique',
    availableInStatus: ['evaluation_preliminary'],
    nextStatus: 'technical_review',
    requiresComment: false
  },
  {
    id: 'plan_inspection',
    name: 'Planifier l\'inspection',
    description: 'Organiser une inspection sur site',
    availableInStatus: ['technical_review'],
    nextStatus: 'inspection_planning',
    requiresComment: true
  },
  {
    id: 'request_laboratory_tests',
    name: 'Demander des tests laboratoire',
    description: 'Soumettre les échantillons pour des tests en laboratoire',
    availableInStatus: ['inspection_planning', 'technical_review'],
    nextStatus: 'laboratory_testing',
    requiresComment: true
  },
  {
    id: 'complete_evaluation',
    name: 'Terminer l\'évaluation',
    description: 'Finaliser l\'évaluation technique',
    availableInStatus: ['laboratory_testing', 'inspection_planning', 'technical_review'],
    nextStatus: 'evaluation_final',
    requiresComment: true
  },
  {
    id: 'submit_to_committee',
    name: 'Soumettre au comité',
    description: 'Soumettre la demande au comité de certification',
    availableInStatus: ['evaluation_final'],
    nextStatus: 'decision_committee',
    requiresComment: false
  },
  {
    id: 'approve_certification',
    name: 'Approuver la certification',
    description: 'Approuver l\'attribution du certificat',
    availableInStatus: ['decision_committee'],
    nextStatus: 'certification_issuance',
    requiresComment: false
  },
  {
    id: 'reject_certification',
    name: 'Rejeter la certification',
    description: 'Rejeter la demande de certification',
    availableInStatus: ['decision_committee', 'evaluation_final', 'technical_review', 'evaluation_preliminary'],
    nextStatus: 'completed',
    requiresComment: true
  },
  {
    id: 'issue_certificate',
    name: 'Émettre le certificat',
    description: 'Générer et délivrer le certificat',
    availableInStatus: ['certification_issuance'],
    nextStatus: 'completed',
    requiresComment: false
  }
];

// Modèle d'étapes du workflow
export const getWorkflowSteps = (currentStatus: WorkflowStatus): WorkflowStep[] => {
  const allSteps: WorkflowStep[] = [
    {
      id: 1,
      name: 'Réception de la demande',
      description: 'Examen initial des documents soumis',
      order: 1,
      isCompleted: ['evaluation_preliminary', 'technical_review', 'inspection_planning', 'laboratory_testing', 'evaluation_final', 'decision_committee', 'certification_issuance', 'completed'].includes(currentStatus),
      isActive: currentStatus === 'reception',
    },
    {
      id: 2,
      name: 'Évaluation préliminaire',
      description: 'Vérification de la conformité des documents',
      order: 2,
      isCompleted: ['technical_review', 'inspection_planning', 'laboratory_testing', 'evaluation_final', 'decision_committee', 'certification_issuance', 'completed'].includes(currentStatus),
      isActive: currentStatus === 'evaluation_preliminary',
    },
    {
      id: 3,
      name: 'Revue technique',
      description: 'Analyse approfondie de la demande',
      order: 3,
      isCompleted: ['inspection_planning', 'laboratory_testing', 'evaluation_final', 'decision_committee', 'certification_issuance', 'completed'].includes(currentStatus),
      isActive: currentStatus === 'technical_review',
    },
    {
      id: 4,
      name: 'Inspection sur site',
      description: 'Visite et contrôle des installations',
      order: 4,
      isCompleted: ['laboratory_testing', 'evaluation_final', 'decision_committee', 'certification_issuance', 'completed'].includes(currentStatus) || currentStatus === 'laboratory_testing',
      isActive: currentStatus === 'inspection_planning',
    },
    {
      id: 5,
      name: 'Tests en laboratoire',
      description: 'Analyse des échantillons',
      order: 5,
      isCompleted: ['evaluation_final', 'decision_committee', 'certification_issuance', 'completed'].includes(currentStatus),
      isActive: currentStatus === 'laboratory_testing',
    },
    {
      id: 6,
      name: 'Évaluation finale',
      description: 'Synthèse des résultats et préparation du dossier',
      order: 6,
      isCompleted: ['decision_committee', 'certification_issuance', 'completed'].includes(currentStatus),
      isActive: currentStatus === 'evaluation_final',
    },
    {
      id: 7,
      name: 'Décision du comité',
      description: 'Examen par le comité de certification',
      order: 7,
      isCompleted: ['certification_issuance', 'completed'].includes(currentStatus),
      isActive: currentStatus === 'decision_committee',
    },
    {
      id: 8,
      name: 'Émission du certificat',
      description: 'Génération et délivrance du certificat',
      order: 8,
      isCompleted: currentStatus === 'completed',
      isActive: currentStatus === 'certification_issuance',
    }
  ];

  return allSteps;
};

// Exécuter une action du workflow
export const executeWorkflowAction = (
  requestId: number, 
  actionId: string, 
  comment?: string
): WorkflowStatus => {
  const action = workflowActions.find(a => a.id === actionId);
  if (!action) {
    throw new Error(`Action non trouvée: ${actionId}`);
  }
  
  // Dans une application réelle, ce serait une requête API
  // Ici nous simulons le changement de statut
  console.log(`Action ${action.name} exécutée sur la demande ${requestId}`);
  if (comment) {
    console.log(`Commentaire: ${comment}`);
  }

  return action.nextStatus;
};
