
import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface SupportTabProps {
  isOpen: boolean;
}

const SupportTab: React.FC<SupportTabProps> = ({ isOpen }) => {
  const { user } = useAuth();

  if (!isOpen || !user) return null;

  // Fonction pour obtenir les fonctionnalités basées sur le rôle de l'utilisateur
  const getRoleFeatures = () => {
    switch (user.role) {
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

  const roleFeatures = getRoleFeatures();
  const roleName = getRoleName(user.role);

  return (
    <Card className="w-full">
      <CardHeader className="bg-gray-50">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <CardTitle>Support et Aide</CardTitle>
        </div>
        <CardDescription>
          Informations et guides pour le profil <strong>{roleName}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
            <TabsTrigger value="workflow">Flux de travail</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              {roleFeatures.map((feature, index) => (
                <AccordionItem key={index} value={`feature-${index}`}>
                  <AccordionTrigger className="font-medium">
                    {feature.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2 text-gray-700">{feature.description}</p>
                    <div className="pl-4 border-l-2 border-gray-200 mt-4">
                      <h4 className="text-sm font-medium mb-2">Étapes :</h4>
                      <ol className="space-y-1 list-decimal pl-5">
                        {feature.steps.map((step, sIndex) => (
                          <li key={sIndex} className="text-sm text-gray-600">{step}</li>
                        ))}
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="workflow" className="mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Flux de travail des dossiers</h3>
              <ol className="space-y-4">
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">1. Réception et enregistrement</div>
                  <div className="text-sm text-gray-600 mt-1">Le dossier est d'abord enregistré au service d'Accueil, qui saisit les informations de base et vérifie les documents fournis.</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">2. Évaluation préliminaire</div>
                  <div className="text-sm text-gray-600 mt-1">Le Gestionnaire des dossiers vérifie la conformité administrative et peut soit valider pour l'étape suivante, soit renvoyer à l'Accueil pour corrections.</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">3. Revue technique</div>
                  <div className="text-sm text-gray-600 mt-1">Le Responsable Technique compose un comité technique chargé de définir les paramètres à évaluer, sous la direction d'un Chef de comité.</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">4. Production de la note de frais</div>
                  <div className="text-sm text-gray-600 mt-1">Le Directeur de l'Évaluation valide et génère la note de frais qui est transmise au Responsable Technique et à l'opérateur.</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">5. Planification des inspections</div>
                  <div className="text-sm text-gray-600 mt-1">Après validation du paiement, le Responsable des inspections programme une mission d'inspection.</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">6. Inspections et tests</div>
                  <div className="text-sm text-gray-600 mt-1">Les inspecteurs effectuent la visite et les laboratoires réalisent les analyses sur les échantillons prélevés.</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">7. Évaluation finale</div>
                  <div className="text-sm text-gray-600 mt-1">Le Responsable Technique transmet les rapports au Directeur de l'Évaluation avec son avis technique.</div>
                </li>
                <li className="p-3 bg-gray-50 rounded-md border border-gray-100">
                  <div className="font-medium">8. Décision</div>
                  <div className="text-sm text-gray-600 mt-1">Le Directeur de l'Évaluation peut émettre un certificat de conformité, une lettre d'actions correctives, ou une lettre de rejet.</div>
                </li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="font-medium">
                  Comment puis-je retrouver un dossier spécifique ?
                </AccordionTrigger>
                <AccordionContent>
                  <p>Vous pouvez utiliser la barre de recherche en haut de la page "Demandes" pour rechercher par nom d'entreprise, nom du promoteur ou numéro de dossier.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger className="font-medium">
                  Comment communiquer avec les autres intervenants ?
                </AccordionTrigger>
                <AccordionContent>
                  <p>Vous pouvez utiliser la section commentaires dans les détails de chaque demande. Les commentaires internes ne sont visibles que par le personnel de l'ANOR.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger className="font-medium">
                  Comment suivre l'évolution d'un dossier ?
                </AccordionTrigger>
                <AccordionContent>
                  <p>Consultez l'onglet "Workflow" dans les détails de la demande pour voir l'état d'avancement, ou l'onglet "Historique" pour l'historique complet des actions.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-end gap-2">
        <Button variant="outline">
          Télécharger le guide
        </Button>
        <Button variant="ghost">
          Contacter le support
        </Button>
      </CardFooter>
    </Card>
  );
};

// Fonction pour obtenir le nom convivial du rôle
const getRoleName = (role: string): string => {
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

export default SupportTab;
