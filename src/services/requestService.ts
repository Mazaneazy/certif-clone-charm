
import { CertificationRequest } from '@/types/auth';

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

// Ajoute une nouvelle demande
export const addRequest = (newRequest: Omit<CertificationRequest, 'id'>): CertificationRequest => {
  const currentRequests = getRequests();
  
  // Générer un nouvel ID (en production, cela serait géré par le backend)
  const newId = currentRequests.length > 0 
    ? Math.max(...currentRequests.map(r => r.id)) + 1 
    : 1;
    
  const requestWithId: CertificationRequest = {
    ...newRequest,
    id: newId
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
