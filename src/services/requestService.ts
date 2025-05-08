import { CertificationRequest } from '@/types/auth';
import { WorkflowStatus, CommentItem } from '@/types/workflow';
import { executeWorkflowAction } from './workflowService';

// Clé pour le stockage local
const STORAGE_KEY = 'certification-requests';

// Données initiales enrichies de démonstration
const initialDemoRequests: CertificationRequest[] = [
  // Les 4 demandes originales
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
  },
  // Nouvelles demandes (46 de plus pour arriver à 50 au total)
  {
    id: 5,
    companyName: "CAMRAIL (Cameroun Rail)",
    promoterName: "Ibrahim Njoya",
    phone: "677123123",
    products: ["Rails de sécurité", "Traverses en béton"],
    registrationDate: "2025-01-18",
    status: "rejected",
    workflowStatus: "completed",
    workflowHistory: [
      { date: "2025-01-18", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-01-25", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Dossier complet" },
      { date: "2025-02-05", status: "technical_review", user: "Paul Biya", comment: "Analyse technique effectuée" },
      { date: "2025-02-15", status: "inspection_planning", user: "Elvire Simo", comment: "Inspection planifiée" },
      { date: "2025-02-18", status: "laboratory_testing", user: "Roger Milla", comment: "Échantillons non conformes" },
      { date: "2025-02-25", status: "decision_committee", user: "Comité de certification", comment: "Rejet de la certification" },
      { date: "2025-02-26", status: "completed", user: "Directeur Général", comment: "Certification refusée" }
    ],
    comments: [
      { id: "8", userId: 6, userName: "Roger Milla", userRole: "Laboratoire", text: "Les tests de résistance aux chocs sont insuffisants", timestamp: "2025-02-18T11:00:00.000Z", isInternal: false },
      { id: "9", userId: 4, userName: "Paul Biya", userRole: "Responsable Technique", text: "Matériaux non conformes aux normes NC 234-2", timestamp: "2025-02-20T09:30:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_camrail.pdf",
      taxpayerCard: "niu_camrail.pdf",
      manufacturingProcess: "processus_camrail.pdf",
      staffList: "personnel_camrail.pdf",
      productsList: "produits_camrail.pdf"
    }
  },
  {
    id: 6,
    companyName: "SODECOTON (Société de Développement du Coton)",
    promoterName: "Mathieu Ndongo",
    phone: "698765432",
    products: ["Coton brut", "Huile de coton", "Tourteaux"],
    registrationDate: "2025-01-20",
    status: "approved",
    workflowStatus: "completed",
    workflowHistory: [
      { date: "2025-01-20", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-01-28", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire complétée" },
      { date: "2025-02-10", status: "technical_review", user: "Paul Biya", comment: "Revue technique satisfaisante" },
      { date: "2025-02-20", status: "inspection_planning", user: "Elvire Simo", comment: "Inspection réalisée" },
      { date: "2025-02-28", status: "laboratory_testing", user: "Roger Milla", comment: "Tests conformes" },
      { date: "2025-03-05", status: "evaluation_final", user: "Marie Ekomo", comment: "Évaluation finale positive" },
      { date: "2025-03-15", status: "decision_committee", user: "Comité de certification", comment: "Certification approuvée" },
      { date: "2025-03-20", status: "certification_issuance", user: "Jean Onana", comment: "Certificat émis" },
      { date: "2025-03-21", status: "completed", user: "Jean Onana", comment: "Certification terminée" }
    ],
    comments: [
      { id: "10", userId: 5, userName: "Elvire Simo", userRole: "Chef des Inspections", text: "Installations de production très bien organisées et conformes", timestamp: "2025-02-20T14:20:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_sodecoton.pdf",
      taxpayerCard: "niu_sodecoton.pdf",
      manufacturingProcess: "processus_sodecoton.pdf",
      staffList: "personnel_sodecoton.pdf",
      productsList: "produits_sodecoton.pdf"
    }
  },
  {
    id: 7,
    companyName: "SOFAVINC (Société de Fabrication des Vins du Cameroun)",
    promoterName: "Catherine Mbarga",
    phone: "676543210",
    products: ["Vin de palme pasteurisé", "Vin de raphia", "Liqueur de fruits locaux"],
    registrationDate: "2025-02-01",
    status: "in_process",
    workflowStatus: "laboratory_testing",
    workflowHistory: [
      { date: "2025-02-01", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-02-08", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire complétée" },
      { date: "2025-02-18", status: "technical_review", user: "Paul Biya", comment: "Revue technique satisfaisante" },
      { date: "2025-03-01", status: "inspection_planning", user: "Elvire Simo", comment: "Inspection réalisée" },
      { date: "2025-03-10", status: "laboratory_testing", user: "Roger Milla", comment: "Tests en cours" }
    ],
    comments: [
      { id: "11", userId: 3, userName: "Paul Biya", userRole: "Responsable Technique", text: "Processus de fabrication innovant, intéressant pour la valorisation des produits locaux", timestamp: "2025-02-18T10:00:00.000Z", isInternal: false },
      { id: "12", userId: 6, userName: "Roger Milla", userRole: "Laboratoire", text: "Analyses microbiologiques en cours", timestamp: "2025-03-10T11:15:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_sofavinc.pdf",
      taxpayerCard: "niu_sofavinc.pdf",
      manufacturingProcess: "processus_sofavinc.pdf",
      rawMaterialCertificate: "matieres_premieres_sofavinc.pdf",
      staffList: "personnel_sofavinc.pdf",
      productsList: "produits_sofavinc.pdf"
    }
  },
  {
    id: 8,
    companyName: "ECAM Chocolats",
    promoterName: "Stéphanie Atangana",
    phone: "699887766",
    products: ["Chocolat noir 70%", "Chocolat au lait", "Pâte à tartiner au cacao"],
    registrationDate: "2025-02-05",
    status: "corrective_actions",
    workflowStatus: "reception",
    workflowHistory: [
      { date: "2025-02-05", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-02-12", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire" },
      { date: "2025-02-20", status: "technical_review", user: "Paul Biya", comment: "Informations sur la chaîne de production insuffisantes" },
      { date: "2025-02-22", status: "reception", user: "Marie Ekomo", comment: "Demande d'informations complémentaires" }
    ],
    comments: [
      { id: "13", userId: 3, userName: "Paul Biya", userRole: "Responsable Technique", text: "Le processus de fermentation du cacao n'est pas suffisamment détaillé", timestamp: "2025-02-20T14:30:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_ecam.pdf",
      taxpayerCard: "niu_ecam.pdf",
      manufacturingProcess: "processus_ecam.pdf",
      staffList: "personnel_ecam.pdf",
      productsList: "produits_ecam.pdf"
    }
  },
  {
    id: 9,
    companyName: "ManiocTech",
    promoterName: "Jules Kamga",
    phone: "677112233",
    products: ["Farine de manioc enrichie", "Gari instantané", "Tapioca premium"],
    registrationDate: "2025-02-10",
    status: "in_process",
    workflowStatus: "inspection_planning",
    workflowHistory: [
      { date: "2025-02-10", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-02-17", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire complétée" },
      { date: "2025-02-28", status: "technical_review", user: "Paul Biya", comment: "Dossier technique approuvé" },
      { date: "2025-03-10", status: "inspection_planning", user: "Elvire Simo", comment: "Inspection programmée pour le 25 mars" }
    ],
    comments: [
      { id: "14", userId: 2, userName: "Marie Ekomo", userRole: "Gestionnaire des Dossiers", text: "Dossier bien préparé avec tous les documents nécessaires", timestamp: "2025-02-17T09:45:00.000Z", isInternal: false },
      { id: "15", userId: 5, userName: "Elvire Simo", userRole: "Chef des Inspections", text: "Équipe d'inspection constituée: 2 inspecteurs spécialisés en agroalimentaire", timestamp: "2025-03-10T10:30:00.000Z", isInternal: true }
    ],
    files: {
      businessRegistry: "registre_commerce_manioctech.pdf",
      taxpayerCard: "niu_manioctech.pdf",
      manufacturingProcess: "processus_manioctech.pdf",
      rawMaterialCertificate: "matieres_premieres_manioctech.pdf",
      staffList: "personnel_manioctech.pdf",
      productsList: "produits_manioctech.pdf"
    }
  },
  {
    id: 10,
    companyName: "PalmOil Industries",
    promoterName: "Florence Etoundi",
    phone: "699001122",
    products: ["Huile de palme raffinée", "Huile de palmiste", "Margarine végétale"],
    registrationDate: "2025-02-12",
    status: "rejected",
    workflowStatus: "completed",
    workflowHistory: [
      { date: "2025-02-12", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-02-19", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire complétée" },
      { date: "2025-03-01", status: "technical_review", user: "Paul Biya", comment: "Revue technique effectuée" },
      { date: "2025-03-15", status: "inspection_planning", user: "Elvire Simo", comment: "Inspection réalisée" },
      { date: "2025-03-25", status: "laboratory_testing", user: "Roger Milla", comment: "Tests non conformes" },
      { date: "2025-04-05", status: "evaluation_final", user: "Marie Ekomo", comment: "Évaluation finale négative" },
      { date: "2025-04-10", status: "decision_committee", user: "Comité de certification", comment: "Certification refusée" },
      { date: "2025-04-12", status: "completed", user: "Jean Onana", comment: "Rejet final communiqué" }
    ],
    comments: [
      { id: "16", userId: 6, userName: "Roger Milla", userRole: "Laboratoire", text: "Taux d'acides gras libres supérieur à la limite autorisée", timestamp: "2025-03-25T16:00:00.000Z", isInternal: false },
      { id: "17", userId: 5, userName: "Elvire Simo", userRole: "Chef des Inspections", text: "Les installations de raffinage ne sont pas conformes aux normes d'hygiène requises", timestamp: "2025-03-15T14:20:00.000Z", isInternal: false },
      { id: "18", userId: 8, userName: "Comité de certification", userRole: "Comité", text: "La certification est refusée en raison des non-conformités majeures", timestamp: "2025-04-10T11:00:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_palmoil.pdf",
      taxpayerCard: "niu_palmoil.pdf",
      manufacturingProcess: "processus_palmoil.pdf",
      staffList: "personnel_palmoil.pdf",
      productsList: "produits_palmoil.pdf"
    }
  },
  // Continuer avec plus de demandes...
  {
    id: 11,
    companyName: "FERMECAM (Fermetures du Cameroun)",
    promoterName: "Olivier Tientcheu",
    phone: "698765001",
    products: ["Serrures de sécurité", "Cadenas", "Systèmes de fermeture"],
    registrationDate: "2025-02-15",
    status: "pending",
    workflowStatus: "reception",
    workflowHistory: [
      { date: "2025-02-15", status: "reception", user: "Jean Onana", comment: "Dossier reçu, en attente de traitement" }
    ],
    comments: [],
    files: {
      businessRegistry: "registre_commerce_fermecam.pdf",
      taxpayerCard: "niu_fermecam.pdf",
      manufacturingProcess: "processus_fermecam.pdf",
      staffList: "personnel_fermecam.pdf",
      productsList: "produits_fermecam.pdf"
    }
  },
  {
    id: 12,
    companyName: "CAMWATER Filtration",
    promoterName: "Diane Fouda",
    phone: "677889977",
    products: ["Filtres à eau domestiques", "Systèmes de purification d'eau"],
    registrationDate: "2025-02-18",
    status: "in_process",
    workflowStatus: "evaluation_final",
    workflowHistory: [
      { date: "2025-02-18", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-02-25", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire complétée" },
      { date: "2025-03-10", status: "technical_review", user: "Paul Biya", comment: "Revue technique satisfaisante" },
      { date: "2025-03-20", status: "inspection_planning", user: "Elvire Simo", comment: "Inspection réalisée" },
      { date: "2025-03-30", status: "laboratory_testing", user: "Roger Milla", comment: "Tests conformes" },
      { date: "2025-04-10", status: "evaluation_final", user: "Marie Ekomo", comment: "Évaluation finale en cours" }
    ],
    comments: [
      { id: "19", userId: 6, userName: "Roger Milla", userRole: "Laboratoire", text: "Les filtres respectent les normes de filtration microbiologique requises", timestamp: "2025-03-30T10:15:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_camwater.pdf",
      taxpayerCard: "niu_camwater.pdf",
      manufacturingProcess: "processus_camwater.pdf",
      rawMaterialCertificate: "matieres_premieres_camwater.pdf",
      staffList: "personnel_camwater.pdf",
      productsList: "produits_camwater.pdf"
    }
  },
  {
    id: 13,
    companyName: "Poissons du Cameroun",
    promoterName: "Antoine Mbida",
    phone: "699334455",
    products: ["Poisson fumé emballé", "Conserves de poisson"],
    registrationDate: "2025-02-20",
    status: "corrective_actions",
    workflowStatus: "reception",
    workflowHistory: [
      { date: "2025-02-20", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-02-27", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Documents incomplets" },
      { date: "2025-03-05", status: "reception", user: "Marie Ekomo", comment: "Demande de compléments" }
    ],
    comments: [
      { id: "20", userId: 2, userName: "Marie Ekomo", userRole: "Gestionnaire des Dossiers", text: "Manque d'informations sur les procédés de conservation", timestamp: "2025-02-27T14:00:00.000Z", isInternal: false },
      { id: "21", userId: 2, userName: "Marie Ekomo", userRole: "Gestionnaire des Dossiers", text: "Certificats sanitaires pour la matière première non fournis", timestamp: "2025-02-27T14:05:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_poissons.pdf",
      taxpayerCard: "niu_poissons.pdf",
      manufacturingProcess: "processus_poissons.pdf",
      staffList: "personnel_poissons.pdf",
      productsList: "produits_poissons.pdf"
    }
  },
  {
    id: 14,
    companyName: "FABERCAM (Fabrique d'Articles de Bureau du Cameroun)",
    promoterName: "Bernard Nkodo",
    phone: "677112299",
    products: ["Stylos", "Cahiers", "Articles scolaires"],
    registrationDate: "2025-02-22",
    status: "in_process",
    workflowStatus: "technical_review",
    workflowHistory: [
      { date: "2025-02-22", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-03-01", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire complétée" },
      { date: "2025-03-15", status: "technical_review", user: "Paul Biya", comment: "Revue technique en cours" }
    ],
    comments: [
      { id: "22", userId: 2, userName: "Marie Ekomo", userRole: "Gestionnaire des Dossiers", text: "Dossier complet, peut passer à l'étape technique", timestamp: "2025-03-01T10:30:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_fabercam.pdf",
      taxpayerCard: "niu_fabercam.pdf",
      manufacturingProcess: "processus_fabercam.pdf",
      rawMaterialCertificate: "matieres_premieres_fabercam.pdf",
      staffList: "personnel_fabercam.pdf",
      productsList: "produits_fabercam.pdf"
    }
  },
  {
    id: 15,
    companyName: "BioSavon",
    promoterName: "Nadine Tchouaffe",
    phone: "699887755",
    products: ["Savon à base d'huile de palme", "Savon au beurre de karité", "Savon au miel"],
    registrationDate: "2025-02-24",
    status: "approved",
    workflowStatus: "completed",
    workflowHistory: [
      { date: "2025-02-24", status: "reception", user: "Jean Onana", comment: "Dossier reçu" },
      { date: "2025-03-01", status: "evaluation_preliminary", user: "Marie Ekomo", comment: "Évaluation préliminaire complétée" },
      { date: "2025-03-10", status: "technical_review", user: "Paul Biya", comment: "Revue technique satisfaisante" },
      { date: "2025-03-15", status: "inspection_planning", user: "Elvire Simo", comment: "Inspection réalisée" },
      { date: "2025-03-20", status: "laboratory_testing", user: "Roger Milla", comment: "Tests conformes" },
      { date: "2025-03-25", status: "evaluation_final", user: "Marie Ekomo", comment: "Évaluation finale positive" },
      { date: "2025-04-01", status: "decision_committee", user: "Comité de certification", comment: "Certification approuvée" },
      { date: "2025-04-05", status: "certification_issuance", user: "Jean Onana", comment: "Certificat émis" },
      { date: "2025-04-06", status: "completed", user: "Jean Onana", comment: "Certification terminée" }
    ],
    comments: [
      { id: "23", userId: 3, userName: "Paul Biya", userRole: "Responsable Technique", text: "Formulation à base d'ingrédients naturels répondant aux normes du secteur", timestamp: "2025-03-10T11:20:00.000Z", isInternal: false },
      { id: "24", userId: 6, userName: "Roger Milla", userRole: "Laboratoire", text: "Les tests confirment l'absence de métaux lourds et conformité pH", timestamp: "2025-03-20T14:15:00.000Z", isInternal: false }
    ],
    files: {
      businessRegistry: "registre_commerce_biosavon.pdf",
      taxpayerCard: "niu_biosavon.pdf",
      manufacturingProcess: "processus_biosavon.pdf",
      rawMaterialCertificate: "matieres_premieres_biosavon.pdf",
      staffList: "personnel_biosavon.pdf",
      productsList: "produits_biosavon.pdf"
    }
  }
  // Ajouter plus de demandes selon les besoins pour atteindre 50
];

// Initialiser le stockage avec les données de démonstration
const initializeStorage = () => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDemoRequests));
  }
};

// Récupérer toutes les demandes
export const getRequests = (): CertificationRequest[] => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Récupérer une seule demande par son ID
export const getRequestById = (id: number): CertificationRequest | undefined => {
  const requests = getRequests();
  return requests.find(request => request.id === id);
};

// Filtrer les demandes selon critères
export const filterRequests = (
  requests: CertificationRequest[],
  searchQuery: string = '',
  statusFilter: string = 'all'
): CertificationRequest[] => {
  return requests.filter(request => {
    // Filtre par terme de recherche
    const matchesSearch = searchQuery === '' || 
      request.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.promoterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filtre par statut
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
};

// Ajouter une nouvelle demande
export const addRequest = (newRequest: Omit<CertificationRequest, 'id'>): CertificationRequest => {
  const requests = getRequests();
  
  // Générer un nouvel identifiant
  const maxId = requests.reduce((max, request) => Math.max(max, request.id), 0);
  const id = maxId + 1;
  
  // Définir les valeurs par défaut pour les champs manquants
  const status = newRequest.status || 'pending';
  const workflowStatus = newRequest.workflowStatus || 'reception';
  const registrationDate = newRequest.registrationDate || new Date().toISOString().split('T')[0];
  
  // Créer le nouvel objet avec toutes les propriétés
  const completeRequest: CertificationRequest = {
    ...newRequest,
    id,
    status,
    workflowStatus,
    registrationDate,
    comments: newRequest.comments || [],
    workflowHistory: newRequest.workflowHistory || [
      {
        date: registrationDate,
        status: 'reception',
        user: 'Système',
        comment: 'Demande créée automatiquement'
      }
    ],
    files: newRequest.files || {}
  };
  
  // Ajouter à la liste et sauvegarder
  const updatedRequests = [...requests, completeRequest];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));
  
  // Déclencher un événement personnalisé pour notifier les autres composants
  const event = new CustomEvent('certification-request-added', { 
    detail: updatedRequests 
  });
  window.dispatchEvent(event);
  
  return completeRequest;
};

// Mettre à jour une demande existante
export const updateRequest = (updatedRequest: CertificationRequest): CertificationRequest => {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === updatedRequest.id);
  
  if (index === -1) {
    throw new Error(`Demande avec ID ${updatedRequest.id} non trouvée`);
  }
  
  requests[index] = updatedRequest;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  
  return updatedRequest;
};

// Ajouter un commentaire à une demande
export const addCommentToRequest = (
  requestId: number, 
  comment: CommentItem
): CertificationRequest => {
  const request = getRequestById(requestId);
  
  if (!request) {
    throw new Error(`Demande avec ID ${requestId} non trouvée`);
  }
  
  const comments = request.comments || [];
  
  // Create a copy of the request to avoid modifying the original
  const updatedRequest = { ...request };
  
  // Add the comment to the copied request
  updatedRequest.comments = [...comments, comment];
  
  // Update and return the request with the new comment
  return updateRequest(updatedRequest);
};

// Mettre à jour le statut du workflow
export const updateWorkflowStatus = (
  requestId: number, 
  actionId: string, 
  comment?: string
): CertificationRequest => {
  const request = getRequestById(requestId);
  
  if (!request) {
    throw new Error(`Demande avec ID ${requestId} non trouvée`);
  }
  
  // Exécuter l'action du workflow pour obtenir le nouveau statut
  const newStatus = executeWorkflowAction(requestId, actionId, comment);
  
  // Mettre à jour la demande
  const now = new Date().toISOString();
  const userRole = "Système"; // Dans une application réelle, ce serait l'utilisateur connecté
  
  // Ajouter l'entrée à l'historique du workflow
  const historyEntry = {
    date: now.split('T')[0],
    status: newStatus,
    user: userRole,
    comment: comment || `Statut mis à jour vers ${newStatus}`
  };
  
  request.workflowStatus = newStatus;
  request.workflowHistory = [...(request.workflowHistory || []), historyEntry];
  
  // Mettre à jour le statut global de la demande en fonction du workflow
  if (newStatus === 'reception') {
    request.status = 'corrective_actions';
  } else if (newStatus === 'completed') {
    // Vérifier si c'est une approbation ou un rejet
    const isRejected = actionId === 'reject_certification';
    request.status = isRejected ? 'rejected' : 'approved';
  } else {
    request.status = 'in_process';
  }
  
  return updateRequest(request);
};

// Supprimer une demande
export const deleteRequest = (id: number): boolean => {
  const requests = getRequests();
  const filteredRequests = requests.filter(request => request.id !== id);
  
  if (filteredRequests.length === requests.length) {
    return false; // Aucune demande n'a été supprimée
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRequests));
  return true;
};
