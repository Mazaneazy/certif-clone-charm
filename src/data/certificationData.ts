
export interface Certification {
  id: number;
  title: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'pending';
  type: string;
  issuer?: string;
  inspectionDate?: string;
  inspector?: string;
  standards?: string[];
  history?: Array<{
    date: string;
    action: string;
    user: string;
  }>;
}

// Données de démonstration pour les certifications
export const certifications: Certification[] = [
  {
    id: 1,
    title: "Certification NC 234 - Bière 33 Export",
    issueDate: "15 mars 2025",
    expiryDate: "15 mars 2028",
    status: "valid",
    type: "boisson",
    issuer: "ANOR",
    inspector: "Jean-Pierre Mbarga",
    inspectionDate: "10 mars 2025",
    standards: ["NC 234-2023 - Bières"],
    history: [
      {
        date: "15 mars 2025",
        action: "Émission du certificat",
        user: "Catherine Mvogo"
      },
      {
        date: "10 mars 2025",
        action: "Inspection réalisée",
        user: "Jean-Pierre Mbarga"
      },
      {
        date: "1 mars 2025",
        action: "Demande soumise",
        user: "Rodrigue Fotso"
      }
    ]
  },
  {
    id: 2,
    title: "Certification NC 132 - Sucre blanc en morceaux",
    issueDate: "20 février 2025",
    expiryDate: "20 février 2028",
    status: "valid",
    type: "alimentaire",
    issuer: "ANOR",
    inspector: "Alice Ndongo",
    inspectionDate: "15 février 2025",
    standards: ["NC 132-2022 - Sucre et produits sucrés"],
    history: [
      {
        date: "20 février 2025",
        action: "Émission du certificat",
        user: "Catherine Mvogo"
      },
      {
        date: "15 février 2025",
        action: "Inspection réalisée",
        user: "Alice Ndongo"
      }
    ]
  },
  {
    id: 3,
    title: "Certification NC 089 - Chocolat Mambo",
    issueDate: "10 janvier 2025",
    expiryDate: "10 janvier 2026",
    status: "valid",
    type: "confiserie",
    issuer: "ANOR",
    inspector: "Pierre Essomba",
    inspectionDate: "5 janvier 2025",
    standards: ["NC 089-2023 - Confiseries et chocolats"],
    history: [
      {
        date: "10 janvier 2025",
        action: "Émission du certificat",
        user: "Catherine Mvogo"
      }
    ]
  },
  {
    id: 4,
    title: "Certification NC 178 - Pagne écru CICAM",
    issueDate: "5 décembre 2024",
    expiryDate: "5 décembre 2024",
    status: "expired",
    type: "textile",
    issuer: "ANOR",
    inspector: "Claude Ekani",
    inspectionDate: "1 décembre 2024",
    standards: ["NC 178-2022 - Textiles et tissus"],
    history: [
      {
        date: "6 décembre 2024",
        action: "Certification expirée",
        user: "Système"
      },
      {
        date: "5 décembre 2024",
        action: "Émission du certificat",
        user: "Catherine Mvogo"
      }
    ]
  },
  {
    id: 5,
    title: "Certification NC 256 - Huile de palme Azur",
    issueDate: "25 avril 2025",
    expiryDate: "25 avril 2027",
    status: "valid",
    type: "huile",
    issuer: "ANOR",
    inspector: "Émilie Minkeng",
    inspectionDate: "20 avril 2025",
    standards: ["NC 256-2023 - Huiles végétales"],
    history: [
      {
        date: "25 avril 2025",
        action: "Émission du certificat",
        user: "Catherine Mvogo"
      }
    ]
  },
  {
    id: 6,
    title: "Certification NC 305 - Tomates en boîte SCAN",
    issueDate: "10 mai 2025",
    expiryDate: "N/A",
    status: "pending",
    type: "conserve",
    issuer: "En attente",
    inspector: "Marc Ondobo",
    inspectionDate: "5 mai 2025",
    standards: ["NC 305-2024 - Conserves alimentaires"],
    history: [
      {
        date: "5 mai 2025",
        action: "Inspection réalisée",
        user: "Marc Ondobo"
      },
      {
        date: "1 mai 2025",
        action: "Demande soumise",
        user: "Charles Mballa"
      }
    ]
  },
];
