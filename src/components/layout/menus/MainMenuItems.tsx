
import React from 'react';
import { 
  Home, 
  FileText, 
  FileCheck, 
  Clock, 
  Calendar,
  Users,
  CreditCard,
  BarChart,
  BadgeCheck,
  FileSearch,
  Calculator,
  TestTube,
  FileInput,
  ClipboardCheck,
  Building,
  HelpCircle
} from "lucide-react";
import { MenuItemType } from "@/types/menu";

export const getMainMenuItems = (): MenuItemType[] => [
  // Éléments accessibles à tous
  {
    title: "Tableau de bord",
    path: "/",
    icon: Home,
    ariaLabel: "Accéder au tableau de bord"
  },
  
  // Étape 1: Accueil - Enregistrement initial
  {
    title: "Nouvelle demande",
    path: "/certification-request",
    icon: FileInput,
    permission: "register_requests",
    ariaLabel: "Créer une nouvelle demande",
    roles: ['accueil', 'admin', 'producteur']
  },
  
  // Visible par tous pour suivre les demandes
  {
    title: "Demandes",
    path: "/certification-requests",
    icon: FileSearch,
    permission: "view_all_requests",
    ariaLabel: "Voir les demandes de certification"
  },
  
  // Étape 2: Gestionnaire - Évaluation préliminaire
  {
    title: "Dossiers à évaluer",
    path: "/evaluation-preliminary",
    icon: FileText,
    permission: "evaluate_requests",
    ariaLabel: "Évaluer les dossiers",
    roles: ['gestionnaire', 'admin']
  },
  
  // Étape 3: Responsable technique et Comité
  {
    title: "Comités techniques",
    path: "/technical-committees",
    icon: Users,
    permission: "manage_committees",
    ariaLabel: "Gérer les comités techniques",
    roles: ['responsable_technique', 'chef_comite', 'admin']
  },
  
  // Étape 4: Pour le comité et le responsable technique
  {
    title: "Paramètres de test",
    path: "/test-parameters",
    icon: TestTube,
    permission: "manage_test_parameters",
    ariaLabel: "Gérer les paramètres de test",
    roles: ['responsable_technique', 'chef_comite', 'directeur_evaluation', 'admin']
  },
  
  // Étape 5: Directeur d'évaluation et comptabilité
  {
    title: "Calcul des frais",
    path: "/fees-calculation",
    icon: Calculator,
    permission: "manage_fees",
    ariaLabel: "Calculer les frais de certification",
    roles: ['directeur_evaluation', 'comptable', 'responsable_technique', 'admin']
  },
  
  // Étape 6: Chef des inspections
  {
    title: "Planification inspections",
    path: "/inspections",
    icon: Calendar,
    permission: "plan_inspections",
    ariaLabel: "Planifier les inspections",
    roles: ['chef_inspections', 'admin']
  },
  
  // Étape 7: Inspecteurs 
  {
    title: "Missions d'inspection",
    path: "/inspection-missions",
    icon: ClipboardCheck,
    permission: "perform_inspection",
    ariaLabel: "Gérer les missions d'inspection",
    roles: ['inspecteur', 'chef_inspections', 'admin']
  },
  
  // Étape 8: Laboratoire
  {
    title: "Analyses laboratoire",
    path: "/laboratory-tests",
    icon: TestTube,
    permission: "perform_tests",
    ariaLabel: "Gérer les analyses en laboratoire",
    roles: ['laboratoire', 'admin']
  },
  
  // Étape 9: Décision finale
  {
    title: "Décisions et Certificats",
    path: "/certifications",
    icon: FileCheck,
    permission: "issue_certificates",
    ariaLabel: "Gérer les certifications",
    roles: ['directeur_evaluation', 'responsable_technique', 'admin']
  },
  
  // Éléments administratifs et outils
  {
    title: "Paiements",
    path: "/payments",
    icon: CreditCard,
    permission: "manage_payments",
    ariaLabel: "Gérer les paiements",
    roles: ['comptable', 'admin', 'producteur']
  },
  {
    title: "Entreprises",
    path: "/companies",
    icon: Building,
    permission: "view_companies",
    ariaLabel: "Gérer les entreprises",
    roles: ['gestionnaire', 'responsable_technique', 'directeur_evaluation', 'admin']
  },
  {
    title: "Normes",
    path: "/standards",
    icon: BadgeCheck,
    permission: "view_standards",
    ariaLabel: "Consulter les normes"
  },
  {
    title: "Laboratoires",
    path: "/laboratories",
    icon: TestTube,
    permission: "assign_laboratories",
    ariaLabel: "Gérer les laboratoires",
    roles: ['responsable_technique', 'chef_comite', 'directeur_evaluation', 'admin']
  },
  {
    title: "Utilisateurs",
    path: "/users",
    icon: Users,
    permission: "manage_users",
    ariaLabel: "Gérer les utilisateurs",
    roles: ['admin', 'directeur_evaluation']
  },
  {
    title: "Rapports",
    path: "/reports",
    icon: BarChart,
    permission: "view_reports",
    ariaLabel: "Voir les rapports",
    roles: ['directeur', 'directeur_evaluation', 'responsable_technique', 'admin']
  },
  {
    title: "Historique",
    path: "/history",
    icon: Clock,
    ariaLabel: "Consulter l'historique"
  },
  {
    title: "Aide et Support",
    path: "/support",
    icon: HelpCircle,
    ariaLabel: "Accéder à l'aide et au support"
  }
];
