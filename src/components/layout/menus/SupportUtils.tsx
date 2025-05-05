
import { type ElementType } from "react";

// Define the feature type that's shown on the support page
export interface FeatureType {
  title: string;
  description: string;
  steps: string[];
  icon?: ElementType;
}

// Function to get role name in a user-friendly format
export const getRoleName = (role: string): string => {
  const roleNames: Record<string, string> = {
    'accueil': "Service d'Accueil",
    'gestionnaire': "Gestionnaire des Dossiers",
    'responsable_technique': "Responsable Technique",
    'chef_comite': "Chef de Comité Technique",
    'directeur_evaluation': "Directeur de l'Évaluation",
    'chef_inspections': "Chef des Inspections",
    'inspecteur': "Inspecteur",
    'laboratoire': "Laboratoire",
    'comptable': "Service Comptabilité",
    'producteur': "Opérateur Économique",
    'admin': "Administrateur",
    'directeur': "Directeur Général"
  };
  
  return roleNames[role] || role;
};

// Fonction pour obtenir les fonctionnalités basées sur le rôle de l'utilisateur
export const getRoleFeatures = (role: string): FeatureType[] => {
  switch (role) {
    case 'accueil':
      return [
        {
          title: "Enregistrement des demandes",
          description: "Réception et enregistrement initial des demandes de certification.",
          steps: [
            "Vérifier les documents fournis par l'opérateur",
            "Saisir les informations de l'entreprise et du promoteur",
            "Uploader les documents requis",
            "Soumettre la demande pour évaluation préliminaire"
          ]
        },
        {
          title: "Suivi des demandes",
          description: "Consultation de l'état d'avancement des demandes.",
          steps: [
            "Accéder à la liste des demandes",
            "Filtrer par statut ou date",
            "Consulter les détails d'une demande"
          ]
        },
        {
          title: "Gestion des corrections",
          description: "Traitement des demandes renvoyées pour corrections.",
          steps: [
            "Recevoir les notifications de demandes à corriger",
            "Consulter les commentaires du gestionnaire",
            "Effectuer les corrections nécessaires",
            "Soumettre à nouveau la demande"
          ]
        }
      ];

    case 'gestionnaire':
      return [
        {
          title: "Évaluation préliminaire",
          description: "Vérification de la conformité initiale des dossiers.",
          steps: [
            "Consulter les nouvelles demandes",
            "Examiner les documents fournis",
            "Valider pour transmission au Responsable Technique",
            "Ou renvoyer à l'accueil avec des commentaires pour correction"
          ]
        },
        {
          title: "Gestion des dossiers",
          description: "Suivi administratif des demandes en cours.",
          steps: [
            "Suivre l'évolution des dossiers",
            "Générer des rapports d'activité",
            "Communiquer avec les différents intervenants"
          ]
        }
      ];

    case 'responsable_technique':
      return [
        {
          title: "Composition du comité technique",
          description: "Désignation des membres du comité d'évaluation.",
          steps: [
            "Sélectionner le chef du comité",
            "Définir les membres du comité technique",
            "Assigner les rôles spécifiques"
          ]
        },
        {
          title: "Validation des paramètres",
          description: "Approbation des paramètres d'évaluation.",
          steps: [
            "Recevoir les propositions du comité technique",
            "Valider ou modifier les paramètres d'évaluation",
            "Transmettre au Directeur d'Évaluation"
          ]
        },
        {
          title: "Validation des paiements",
          description: "Confirmation des paiements reçus.",
          steps: [
            "Vérifier les paiements enregistrés",
            "Valider les frais acquittés",
            "Déclencher la programmation d'inspection"
          ]
        },
        {
          title: "Transmission des rapports",
          description: "Transfert des rapports d'inspection et d'analyse.",
          steps: [
            "Recevoir les rapports d'inspection et d'analyses",
            "Formuler un avis technique",
            "Transmettre au Directeur d'Évaluation avec recommandations"
          ]
        }
      ];

    case 'chef_comite':
      return [
        {
          title: "Définition des paramètres",
          description: "Identification des paramètres à évaluer.",
          steps: [
            "Analyser les produits concernés",
            "Définir les paramètres techniques à évaluer",
            "Documenter les exigences normatives applicables",
            "Soumettre les paramètres au Responsable Technique"
          ]
        },
        {
          title: "Évaluation technique",
          description: "Analyse technique des produits et processus.",
          steps: [
            "Examiner les spécifications techniques",
            "Évaluer la conformité aux normes",
            "Proposer des méthodes d'essais appropriées"
          ]
        }
      ];

    case 'directeur_evaluation':
      return [
        {
          title: "Validation des notes de frais",
          description: "Approbation des coûts de certification.",
          steps: [
            "Examiner les paramètres d'évaluation",
            "Valider le calcul des frais",
            "Générer et signer la note de frais officielle",
            "Transmettre au Responsable Technique et à l'opérateur"
          ]
        },
        {
          title: "Décision de certification",
          description: "Prise de décision finale sur les demandes.",
          steps: [
            "Analyser les rapports d'inspection et d'analyses",
            "Examiner l'avis du Responsable Technique",
            "Prendre une décision (certification, actions correctives, rejet)",
            "Générer les documents officiels correspondants"
          ]
        },
        {
          title: "Émission des certificats",
          description: "Production des certificats de conformité.",
          steps: [
            "Générer le certificat de conformité",
            "Signer le document officiel",
            "Archiver et transmettre aux parties concernées"
          ]
        }
      ];

    case 'chef_inspections':
      return [
        {
          title: "Planification des inspections",
          description: "Organisation des missions d'inspection.",
          steps: [
            "Recevoir les demandes validées pour inspection",
            "Sélectionner les inspecteurs appropriés",
            "Planifier les dates et la logistique",
            "Notifier les parties concernées"
          ]
        },
        {
          title: "Suivi des missions",
          description: "Supervision des inspections en cours.",
          steps: [
            "Suivre l'état d'avancement des missions",
            "Gérer les problèmes éventuels",
            "Valider les rapports d'inspection"
          ]
        }
      ];

    case 'inspecteur':
      return [
        {
          title: "Réalisation des inspections",
          description: "Exécution des missions d'inspection sur site.",
          steps: [
            "Préparer la visite d'inspection",
            "Effectuer l'inspection conformément au protocole",
            "Collecter les échantillons si nécessaire",
            "Documenter les observations et non-conformités"
          ]
        },
        {
          title: "Rédaction des rapports",
          description: "Production des rapports d'inspection.",
          steps: [
            "Rédiger le rapport détaillé",
            "Joindre les preuves et photos",
            "Soumettre le rapport au Chef des inspections"
          ]
        }
      ];

    case 'laboratoire':
      return [
        {
          title: "Analyse des échantillons",
          description: "Réalisation des tests en laboratoire.",
          steps: [
            "Recevoir et enregistrer les échantillons",
            "Effectuer les analyses selon les méthodes approuvées",
            "Documenter les résultats et observations"
          ]
        },
        {
          title: "Production des rapports d'essais",
          description: "Élaboration des rapports d'analyse.",
          steps: [
            "Compiler les résultats des tests",
            "Rédiger le rapport d'analyse",
            "Valider et soumettre au Responsable Technique"
          ]
        }
      ];

    case 'comptable':
      return [
        {
          title: "Gestion des paiements",
          description: "Suivi des paiements des frais de certification.",
          steps: [
            "Enregistrer les paiements reçus",
            "Rapprocher les paiements avec les notes de frais",
            "Notifier le Responsable Technique des paiements validés"
          ]
        },
        {
          title: "Facturation",
          description: "Émission des factures et reçus.",
          steps: [
            "Générer les factures",
            "Émettre les reçus de paiement",
            "Archiver les transactions"
          ]
        }
      ];

    case 'producteur':
      return [
        {
          title: "Soumission de demande",
          description: "Dépôt des demandes de certification.",
          steps: [
            "Compléter le formulaire de demande",
            "Joindre les documents requis",
            "Soumettre la demande pour examen"
          ]
        },
        {
          title: "Suivi des demandes",
          description: "Consultation de l'état d'avancement.",
          steps: [
            "Consulter le statut des demandes",
            "Répondre aux demandes d'informations complémentaires",
            "Payer les frais de certification"
          ]
        },
        {
          title: "Gestion des certificats",
          description: "Suivi des certificats obtenus.",
          steps: [
            "Télécharger les certificats émis",
            "Vérifier les dates de validité",
            "Initier les renouvellements si nécessaire"
          ]
        }
      ];

    case 'admin':
      return [
        {
          title: "Administration du système",
          description: "Gestion globale de la plateforme.",
          steps: [
            "Gérer les utilisateurs et leurs droits",
            "Configurer les paramètres système",
            "Superviser toutes les opérations"
          ]
        },
        {
          title: "Rapports et statistiques",
          description: "Génération de rapports analytiques.",
          steps: [
            "Produire des statistiques d'activité",
            "Analyser les performances du système",
            "Générer des rapports personnalisés"
          ]
        }
      ];

    default:
      return [
        {
          title: "Fonctionnalités générales",
          description: "Accès aux fonctionnalités communes.",
          steps: [
            "Consulter le tableau de bord",
            "Gérer votre profil",
            "Accéder à l'aide et au support"
          ]
        }
      ];
  }
};
