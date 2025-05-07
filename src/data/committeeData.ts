
import { TechnicalCommittee, CommitteeMember } from '@/types/committee';

// Données initiales pour les membres du comité
export const initialMembers: CommitteeMember[] = [
  {
    id: 1,
    name: "Dr. André Manga",
    email: "a.manga@anor.cm",
    specialization: ["Chimie", "Matériaux"],
    department: "Laboratoire central"
  },
  {
    id: 2,
    name: "Prof. Marie Ekome",
    email: "m.ekome@anor.cm",
    specialization: ["Normes ISO", "Systèmes de qualité"],
    department: "Normalisation"
  },
  {
    id: 3,
    name: "Dr. Jean Fochive",
    email: "j.fochive@anor.cm",
    specialization: ["Agroalimentaire", "Sécurité sanitaire"],
    department: "Évaluation des risques"
  },
  {
    id: 4,
    name: "Ing. Sarah Bikoula",
    email: "s.bikoula@anor.cm",
    specialization: ["Électronique", "Électrotechnique"],
    department: "Conformité électrique"
  },
  {
    id: 5,
    name: "Dr. Paul Ngando",
    email: "p.ngando@anor.cm",
    specialization: ["Métrologie", "Instruments de mesure"],
    department: "Calibrage et métrologie"
  }
];

// Données initiales pour les comités techniques
export const initialCommittees: TechnicalCommittee[] = [
  {
    id: 1,
    name: "Comité d'évaluation des produits agro-alimentaires",
    chief: initialMembers[2],
    members: [initialMembers[0], initialMembers[1], initialMembers[4]],
    creationDate: "2025-01-15",
    purpose: "Évaluation des normes de sécurité alimentaire",
    status: "active"
  }
];
