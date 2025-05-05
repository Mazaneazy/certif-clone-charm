
import React from 'react';

const SupportWorkflow: React.FC = () => {
  const workflowSteps = [
    {
      id: 1,
      title: "Réception et enregistrement",
      description: "Le dossier est d'abord enregistré au service d'Accueil, qui saisit les informations de base et vérifie les documents fournis."
    },
    {
      id: 2,
      title: "Évaluation préliminaire",
      description: "Le Gestionnaire des dossiers vérifie la conformité administrative et peut soit valider pour l'étape suivante, soit renvoyer à l'Accueil pour corrections."
    },
    {
      id: 3,
      title: "Revue technique",
      description: "Le Responsable Technique compose un comité technique chargé de définir les paramètres à évaluer, sous la direction d'un Chef de comité."
    },
    {
      id: 4,
      title: "Production de la note de frais",
      description: "Le Directeur de l'Évaluation valide et génère la note de frais qui est transmise au Responsable Technique et à l'opérateur."
    },
    {
      id: 5,
      title: "Planification des inspections",
      description: "Après validation du paiement, le Responsable des inspections programme une mission d'inspection."
    },
    {
      id: 6,
      title: "Inspections et tests",
      description: "Les inspecteurs effectuent la visite et les laboratoires réalisent les analyses sur les échantillons prélevés."
    },
    {
      id: 7,
      title: "Évaluation finale",
      description: "Le Responsable Technique transmet les rapports au Directeur de l'Évaluation avec son avis technique."
    },
    {
      id: 8,
      title: "Décision",
      description: "Le Directeur de l'Évaluation peut émettre un certificat de conformité, une lettre d'actions correctives, ou une lettre de rejet."
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Flux de travail des dossiers</h3>
      <ol className="space-y-4">
        {workflowSteps.map((step) => (
          <li key={step.id} className="p-3 bg-gray-50 rounded-md border border-gray-100">
            <div className="font-medium">{step.id}. {step.title}</div>
            <div className="text-sm text-gray-600 mt-1">{step.description}</div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default SupportWorkflow;
