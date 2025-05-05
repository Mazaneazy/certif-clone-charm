
import { CertificationRequest } from '@/types/auth';
import { WorkflowStatus, CommentItem } from '@/types/workflow';
import { executeWorkflowAction } from './workflowService';

// Clé pour le stockage local
const STORAGE_KEY = 'certification-requests';

// Données initiales de démonstration
const initialDemoRequests: CertificationRequest[] = [
  {
    id: 1,
    companyName: "SABC (Société Anonyme des Brasseries du Cameroun)",
    promoterName: "Rodrigue Fotso",
    phone: "699123456",
    products: ["Bière 33 Export", "Beaufort Lager", "Castel Beer"],
    registrationDate: "2025-01-15",
    status: "in_process",
    workflowStatus: "technical_review",
    workflowHistory: [
      { 
        date: "2025-01-15", 
        status: "reception", 
        user: "Jean Onana", 
        comment: "Dossier reçu complet" 
      },
      { 
        date: "2025-01-20", 
        status: "evaluation_preliminary", 
        user: "Marie Ekomo", 
        comment: "Documents conformes aux exigences" 
      },
      { 
        date: "2025-01-25", 
        status: "technical_review", 
        user: "Paul Biya", 
        comment: "Dossier en cours d'évaluation technique" 
      }
    ],
    comments: [
      {
        id: "1",
        userId: 2,
        userName: "Marie Ekomo",
        userRole: "Gestionnaire des Dossiers",
        text: "Tous les documents sont conformes. Le dossier est transmis au service technique.",
        timestamp: "2025-01-20T10:30:00.000Z",
        isInternal: false
      },
      {
        id: "2",
        userId: 3,
        userName: "Paul Biya",
        userRole: "Responsable Technique",
        text: "À noter: cette entreprise a déjà obtenu d'autres certifications pour des produits similaires.",
        timestamp: "2025-01-25T14:45:00.000Z",
        isInternal: true
      }
    ],
    files: {
      businessRegistry: "registre_commerce_sabc.pdf",
      taxpayerCard: "niu_sabc.pdf",
      manufacturingProcess: "processus_sabc.pdf",
      staffList: "personnel_sabc.pdf",
      productsList: "produits_sabc.pdf"
    }
  },
  {
    id: 2,
    companyName: "SOSUCAM (Société Sucrière du Cameroun)",
    promoterName: "Aminata Tchoungui",
    phone: "677889900",
    products: ["Sucre blanc en morceaux", "Sucre roux", "Sucre en poudre"],
    registrationDate: "2025-02-20",
    status: "pending",
    workflowStatus: "reception",
    workflowHistory: [
      { 
        date: "2025-02-20", 
        status: "reception", 
        user: "Jean Onana", 
        comment: "Demande reçue, en attente d'analyse" 
      }
    ],
    comments: [],
    files: {
      businessRegistry: "registre_commerce_sosucam.pdf",
      taxpayerCard: "niu_sosucam.pdf",
      manufacturingProcess: "processus_sosucam.pdf",
      rawMaterialCertificate: "matieres_premieres_sosucam.pdf",
      staffList: "personnel_sosucam.pdf",
      productsList: "produits_sosucam.pdf"
    }
  },
  {
    id: 3,
    companyName: "CHOCOCAM (Chocolaterie Confiserie du Cameroun)",
    promoterName: "Paul Essomba",
    phone: "654321987",
    products: ["Chocolat Mambo", "Bonbons Wick's", "Caramels Kola"],
    registrationDate: "2025-03-05",
    status: "approved",
    workflowStatus: "completed",
    workflowHistory: [
      { 
        date: "2025-03-05", 
        status: "reception", 
        user: "Jean Onana", 
        comment: "Dossier reçu et vérifié" 
      },
      { 
        date: "2025-03-10", 
        status: "evaluation_preliminary", 
        user: "Marie Ekomo", 
        comment: "Évaluation préliminaire complétée" 
      },
      { 
        date: "2025-03-15", 
        status: "technical_review", 
        user: "Paul Biya", 
        comment: "Revue technique satisfaisante" 
      },
      { 
        date: "2025-03-20", 
        status: "inspection_planning", 
        user: "Elvire Simo", 
        comment: "Inspection réalisée avec succès" 
      },
      { 
        date: "2025-03-25", 
        status: "laboratory_testing", 
        user: "Roger Milla", 
        comment: "Tests en laboratoire concluants" 
      },
      { 
        date: "2025-03-30", 
        status: "evaluation_final", 
        user: "Marie Ekomo", 
        comment: "Évaluation finale positive" 
      },
      { 
        date: "2025-04-05", 
        status: "decision_committee", 
        user: "Comité de certification", 
        comment: "Certification approuvée à l'unanimité" 
      },
      { 
        date: "2025-04-10", 
        status: "certification_issuance", 
        user: "Jean Onana", 
        comment: "Certificat émis et transmis" 
      },
      { 
        date: "2025-04-10", 
        status: "completed", 
        user: "Jean Onana", 
        comment: "Processus de certification terminé" 
      }
    ],
    comments: [
      {
        id: "3",
        userId: 1,
        userName: "Jean Onana",
        userRole: "Service d'Accueil",
        text: "Dossier complet reçu le 5 mars 2025.",
        timestamp: "2025-03-05T09:15:00.000Z",
        isInternal: false
      },
      {
        id: "4",
        userId: 5,
        userName: "Elvire Simo",
        userRole: "Chef des Inspections",
        text: "L'inspection s'est très bien déroulée. L'entreprise est bien organisée et respecte les normes.",
        timestamp: "2025-03-20T16:20:00.000Z",
        isInternal: false
      },
      {
        id: "5",
        userId: 6,
        userName: "Roger Milla",
        userRole: "Laboratoire",
        text: "Les échantillons ont passé tous les tests avec succès.",
        timestamp: "2025-03-25T11:30:00.000Z",
        isInternal: false
      }
    ],
    files: {
      businessRegistry: "registre_commerce_chococam.pdf",
      taxpayerCard: "niu_chococam.pdf",
      manufacturingProcess: "processus_chococam.pdf",
      staffList: "personnel_chococam.pdf",
      productsList: "produits_chococam.pdf"
    }
  },
  {
    id: 4,
    companyName: "CICAM (Cotonnière Industrielle du Cameroun)",
    promoterName: "Jacqueline Koung",
    phone: "691234567",
    products: ["Pagne écru", "Tissus imprimés", "Serviettes"],
    registrationDate: "2025-03-20",
    status: "corrective_actions",
    workflowStatus: "reception",
    workflowHistory: [
      { 
        date: "2025-03-20", 
        status: "reception", 
        user: "Jean Onana", 
        comment: "Dossier reçu" 
      },
      { 
        date: "2025-03-25", 
        status: "evaluation_preliminary", 
        user: "Marie Ekomo", 
        comment: "Documents incomplets" 
      },
      { 
        date: "2025-03-30", 
        status: "reception", 
        user: "Marie Ekomo", 
        comment: "Demande de compléments d'information" 
      }
    ],
    comments: [
      {
        id: "6",
        userId: 2,
        userName: "Marie Ekomo",
        userRole: "Gestionnaire des Dossiers",
        text: "Le certificat d'origine des matières premières est manquant. Veuillez le fournir pour poursuivre l'évaluation.",
        timestamp: "2025-03-25T15:45:00.000Z",
        isInternal: false
      },
      {
        id: "7",
        userId: 2,
        userName: "Marie Ekomo",
        userRole: "Gestionnaire des Dossiers",
        text: "À surveiller de près, cette entreprise a déjà eu des problèmes de documentation dans le passé.",
        timestamp: "2025-03-25T15:50:00.000Z",
        isInternal: true
      }
    ],
    files: {
      businessRegistry: "registre_commerce_cicam.pdf",
      taxpayerCard: "niu_cicam.pdf",
      manufacturingProcess: "processus_cicam.pdf",
      staffList: "personnel_cicam.pdf",
      productsList: "produits_cicam.pdf"
    }
  }
];

// Récupère les demandes depuis le stockage local
export const getRequests = (): CertificationRequest[] => {
  const storedRequests = localStorage.getItem(STORAGE_KEY);
  
  if (storedRequests) {
    try {
      return JSON.parse(storedRequests);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error);
      // Utiliser les données de démonstration en cas d'erreur
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoRequests));
      return initialDemoRequests;
    }
  } else {
    // Initialiser avec les données de démonstration si aucune donnée n'est trouvée
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoRequests));
    return initialDemoRequests;
  }
};

// Récupère une demande par ID
export const getRequestById = (requestId: number): CertificationRequest | undefined => {
  const requests = getRequests();
  return requests.find(request => request.id === requestId);
};

// Ajoute une nouvelle demande
export const addRequest = (newRequest: Omit<CertificationRequest, 'id'>): CertificationRequest => {
  const currentRequests = getRequests();
  
  // Générer un nouvel ID (en production, cela serait géré par le backend)
  const newId = currentRequests.length > 0 
    ? Math.max(...currentRequests.map(r => r.id)) + 1 
    : 1;
    
  // Ajouter les propriétés de workflow
  const requestWithId: CertificationRequest = {
    ...newRequest,
    id: newId,
    workflowStatus: 'reception' as WorkflowStatus,
    comments: [],
    workflowHistory: [{
      date: new Date().toISOString(),
      status: 'reception',
      user: "Utilisateur actuel", // En production, utiliser l'utilisateur connecté
      comment: "Nouvelle demande enregistrée"
    }]
  };
  
  const updatedRequests = [...currentRequests, requestWithId];
  
  // Mettre à jour le stockage local
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));
  
  // Émettre un événement personnalisé pour informer les autres instances
  const event = new CustomEvent('certification-request-added', { 
    detail: updatedRequests 
  });
  window.dispatchEvent(event);
  
  return requestWithId;
};

// Mettre à jour le statut du workflow
export const updateWorkflowStatus = (
  requestId: number, 
  actionId: string, 
  comment?: string
): CertificationRequest => {
  const requests = getRequests();
  const requestIndex = requests.findIndex(r => r.id === requestId);
  
  if (requestIndex === -1) {
    throw new Error(`Demande non trouvée: ${requestId}`);
  }
  
  const request = requests[requestIndex];
  
  // Exécuter l'action et obtenir le nouveau statut
  const newStatus = executeWorkflowAction(requestId, actionId, comment);
  
  // Mettre à jour le statut de la demande basé sur le statut du workflow
  let requestStatus = request.status;
  if (newStatus === 'completed') {
    // Si le workflow est terminé, mettre à jour le statut de la demande
    requestStatus = 'approved'; // ou rejected selon l'action
  } else if (newStatus === 'reception' && request.workflowStatus !== 'reception') {
    // Si on revient à la réception pour des compléments
    requestStatus = 'corrective_actions';
  } else if (newStatus !== 'reception') {
    // Si on avance dans le workflow
    requestStatus = 'in_process';
  }
  
  // Créer l'entrée d'historique
  const historyEntry = {
    date: new Date().toISOString(),
    status: newStatus,
    user: "Utilisateur actuel", // En production, utiliser l'utilisateur connecté
    comment: comment || "Statut mis à jour"
  };
  
  // Mettre à jour la demande
  const updatedRequest: CertificationRequest = {
    ...request,
    status: requestStatus,
    workflowStatus: newStatus as WorkflowStatus,
    workflowHistory: [...(request.workflowHistory || []), historyEntry]
  };
  
  // Mettre à jour la liste des demandes
  requests[requestIndex] = updatedRequest;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  
  return updatedRequest;
};

// Ajouter un commentaire à une demande
export const addCommentToRequest = (
  requestId: number,
  comment: CommentItem
): CertificationRequest => {
  const requests = getRequests();
  const requestIndex = requests.findIndex(r => r.id === requestId);
  
  if (requestIndex === -1) {
    throw new Error(`Demande non trouvée: ${requestId}`);
  }
  
  const request = requests[requestIndex];
  
  // Ajouter le commentaire
  const updatedRequest: CertificationRequest = {
    ...request,
    comments: [...(request.comments || []), comment]
  };
  
  // Mettre à jour la liste des demandes
  requests[requestIndex] = updatedRequest;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  
  return updatedRequest;
};

// Filtre les demandes selon des critères
export const filterRequests = (
  requests: CertificationRequest[],
  searchQuery: string,
  statusFilter: string
): CertificationRequest[] => {
  return requests.filter(req => {
    // Filtrage par statut
    if (statusFilter !== 'all' && req.status !== statusFilter) {
      return false;
    }
    
    // Filtrage par recherche dans le nom de l'entreprise ou du promoteur
    if (searchQuery && !req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !req.promoterName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
};
