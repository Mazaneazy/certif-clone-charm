
import { TechnicalCommittee, CommitteeMember } from '@/types/committee';

// Storage keys
const COMMITTEES_STORAGE_KEY = 'technical-committees';
const MEMBERS_STORAGE_KEY = 'committee-members';

/**
 * Committee members storage functions
 */
export const getStoredMembers = (): CommitteeMember[] | null => {
  const storedMembers = localStorage.getItem(MEMBERS_STORAGE_KEY);
  if (storedMembers) {
    try {
      return JSON.parse(storedMembers);
    } catch (error) {
      console.error('Erreur lors du chargement des membres:', error);
      return null;
    }
  }
  return null;
};

export const saveMembers = (members: CommitteeMember[]): void => {
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
};

/**
 * Technical committees storage functions
 */
export const getStoredCommittees = (): TechnicalCommittee[] | null => {
  const storedCommittees = localStorage.getItem(COMMITTEES_STORAGE_KEY);
  if (storedCommittees) {
    try {
      return JSON.parse(storedCommittees);
    } catch (error) {
      console.error('Erreur lors du chargement des comités:', error);
      return null;
    }
  }
  return null;
};

export const saveCommittees = (committees: TechnicalCommittee[]): void => {
  localStorage.setItem(COMMITTEES_STORAGE_KEY, JSON.stringify(committees));
};
