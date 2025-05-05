
// Types d'utilisateurs
export const USER_TYPES = [
  { id: 'admin', name: 'Administrateur', permissions: ['*'] },
  { id: 'gestionnaire', name: 'Gestionnaire des Dossiers', permissions: ['register_requests', 'view_all_requests', 'evaluate_requests', 'manage_certifications', 'view_reports'] },
  { id: 'accueil', name: 'Poste Accueil', permissions: ['register_requests', 'view_all_requests'] },
  { id: 'responsable_technique', name: 'Responsable Technique', permissions: ['view_all_requests', 'manage_test_parameters', 'assign_laboratories', 'review_reports'] },
  { id: 'laboratoire', name: 'Laboratoire', permissions: ['upload_test_results', 'view_assigned_tests'] },
  { id: 'chef_inspections', name: 'Chef des Inspections', permissions: ['assign_inspectors', 'manage_inspections', 'view_all_requests'] },
  { id: 'directeur_evaluation', name: 'Directeur Évaluation', permissions: ['make_final_decisions', 'view_all_requests', 'view_all_reports'] },
  { id: 'inspecteur', name: 'Inspecteur', permissions: ['perform_inspection', 'view_certifications'] },
  { id: 'comptable', name: 'Comptable', permissions: ['manage_payments', 'view_certifications'] },
];

// Données de démonstration pour les utilisateurs
export const demoUsers = [
  {
    id: 1,
    name: 'Séverin Eyenga',
    email: 'severin.eyenga@anor.cm',
    role: 'admin',
    department: 'Direction Générale',
    lastActive: '2025-04-30',
    status: 'active',
    avatar: ''
  },
  {
    id: 8,
    name: 'Marthe Ngo Mbock',
    email: 'marthe.ngombock@anor.cm',
    role: 'accueil',
    department: 'Accueil',
    lastActive: '2025-05-02',
    status: 'active',
    avatar: ''
  },
  {
    id: 9,
    name: 'Emmanuel Nkodo',
    email: 'emmanuel.nkodo@anor.cm',
    role: 'responsable_technique',
    department: 'Département Technique',
    lastActive: '2025-05-01',
    status: 'active',
    avatar: ''
  },
  {
    id: 10,
    name: 'Françoise Atangana',
    email: 'francoise.atangana@anor.cm',
    role: 'laboratoire',
    department: 'Laboratoire Central',
    lastActive: '2025-04-25',
    status: 'active',
    avatar: ''
  },
  {
    id: 11,
    name: 'Jean-Pierre Mbarga',
    email: 'jeanpierre.mbarga@anor.cm',
    role: 'chef_inspections',
    department: 'Service des Inspections',
    lastActive: '2025-04-29',
    status: 'active',
    avatar: ''
  },
  {
    id: 12,
    name: 'Catherine Mvogo',
    email: 'catherine.mvogo@anor.cm',
    role: 'directeur_evaluation',
    department: 'Direction de l\'Évaluation',
    lastActive: '2025-04-28',
    status: 'active',
    avatar: ''
  }
];
