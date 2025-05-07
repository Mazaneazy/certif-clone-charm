
import { TechnicalCommittee, CommitteeMember } from '@/types/committee';
import { 
  getStoredMembers, 
  saveMembers, 
  getStoredCommittees, 
  saveCommittees 
} from './storage/committeeStorage';
import { initialMembers, initialCommittees } from '@/data/committeeData';

/**
 * Récupération des membres du comité
 */
export const getCommitteeMembers = (): CommitteeMember[] => {
  const storedMembers = getStoredMembers();
  
  if (storedMembers) {
    return storedMembers;
  } else {
    saveMembers(initialMembers);
    return initialMembers;
  }
};

/**
 * Récupération des comités techniques
 */
export const getCommittees = (): TechnicalCommittee[] => {
  const storedCommittees = getStoredCommittees();
  
  if (storedCommittees) {
    return storedCommittees;
  } else {
    saveCommittees(initialCommittees);
    return initialCommittees;
  }
};

/**
 * Création d'un nouveau membre de comité
 */
export const createMember = (member: Omit<CommitteeMember, 'id'>): CommitteeMember => {
  const members = getCommitteeMembers();
  
  const newId = members.length > 0 
    ? Math.max(...members.map(m => m.id)) + 1 
    : 1;
  
  const newMember: CommitteeMember = {
    ...member,
    id: newId
  };
  
  const updatedMembers = [...members, newMember];
  saveMembers(updatedMembers);
  
  return newMember;
};

/**
 * Création d'un nouveau comité technique
 */
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
  saveCommittees(updatedCommittees);
  
  return newCommittee;
};

/**
 * Mise à jour d'un comité technique existant
 */
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
  saveCommittees(committees);
  
  return updatedCommittee;
};

/**
 * Suppression d'un comité technique
 */
export const deleteCommittee = (id: number): void => {
  const committees = getCommittees();
  const updatedCommittees = committees.filter(c => c.id !== id);
  saveCommittees(updatedCommittees);
};

/**
 * Mise à jour d'un membre de comité existant
 */
export const updateMember = (id: number, updates: Partial<CommitteeMember>): CommitteeMember => {
  const members = getCommitteeMembers();
  const index = members.findIndex(m => m.id === id);
  
  if (index === -1) {
    throw new Error(`Membre non trouvé: ${id}`);
  }
  
  const updatedMember = {
    ...members[index],
    ...updates
  };
  
  members[index] = updatedMember;
  saveMembers(members);
  
  return updatedMember;
};

/**
 * Suppression d'un membre de comité
 * Note: Vérifie si le membre est utilisé dans des comités avant la suppression
 */
export const deleteMember = (id: number): boolean => {
  // Vérifier si le membre est dans un comité
  const committees = getCommittees();
  const memberInCommittee = committees.some(committee => 
    committee.chief.id === id || committee.members.some(m => m.id === id)
  );
  
  if (memberInCommittee) {
    return false; // Ne pas supprimer si le membre est utilisé
  }
  
  const members = getCommitteeMembers();
  const updatedMembers = members.filter(m => m.id !== id);
  saveMembers(updatedMembers);
  
  return true;
};
