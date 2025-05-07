
import { TechnicalCommittee, CommitteeMember } from '@/types/committee';

// Clé pour le stockage local
const STORAGE_KEY = 'technical-committees';
const MEMBERS_STORAGE_KEY = 'committee-members';

// Données initiales pour les membres du comité
const initialMembers: CommitteeMember[] = [
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
const initialCommittees: TechnicalCommittee[] = [
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

// Récupération des membres du comité depuis le stockage local
export const getCommitteeMembers = (): CommitteeMember[] => {
  const storedMembers = localStorage.getItem(MEMBERS_STORAGE_KEY);
  
  if (storedMembers) {
    try {
      return JSON.parse(storedMembers);
    } catch (error) {
      console.error('Erreur lors du chargement des membres:', error);
      localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(initialMembers));
      return initialMembers;
    }
  } else {
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(initialMembers));
    return initialMembers;
  }
};

// Récupération des comités techniques depuis le stockage local
export const getCommittees = (): TechnicalCommittee[] => {
  const storedCommittees = localStorage.getItem(STORAGE_KEY);
  
  if (storedCommittees) {
    try {
      return JSON.parse(storedCommittees);
    } catch (error) {
      console.error('Erreur lors du chargement des comités:', error);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCommittees));
      return initialCommittees;
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCommittees));
    return initialCommittees;
  }
};

// Création d'un nouveau comité technique
export const createCommittee = (committee: Omit<TechnicalCommittee, 'id'>): TechnicalCommittee => {
  const committees = getCommittees();
  
  const newId = committees.length > 0 
    ? Math.max(...committees.map(c => c.id)) + 1 
    : 1;
  
  const newCommittee: TechnicalCommittee = {
    ...committee,
    id: newId
  };
  
  const updatedCommittees = [...committees, newCommittee];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCommittees));
  
  return newCommittee;
};

// Mise à jour d'un comité technique existant
export const updateCommittee = (id: number, updates: Partial<TechnicalCommittee>): TechnicalCommittee => {
  const committees = getCommittees();
  const index = committees.findIndex(c => c.id === id);
  
  if (index === -1) {
    throw new Error(`Comité non trouvé: ${id}`);
  }
  
  const updatedCommittee = {
    ...committees[index],
    ...updates
  };
  
  committees[index] = updatedCommittee;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(committees));
  
  return updatedCommittee;
};

// Suppression d'un comité technique
export const deleteCommittee = (id: number): void => {
  const committees = getCommittees();
  const updatedCommittees = committees.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCommittees));
};
