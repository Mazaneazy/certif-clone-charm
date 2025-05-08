
import React from 'react';
import { 
  Home, 
  FileText, 
  FileCheck, 
  Clock, 
  Settings, 
  User, 
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
  Building
} from "lucide-react";

export interface MenuItemType {
  title: string;
  path: string;
  icon: React.ElementType;
  permission?: string;
  ariaLabel?: string;
}

export const getMainMenuItems = (): MenuItemType[] => [
  {
    title: "Tableau de bord",
    path: "/",
    icon: Home,
    ariaLabel: "Accéder au tableau de bord"
  },
  {
    title: "Nouvelle demande",
    path: "/certification-request",
    icon: FileInput,
    permission: "register_requests",
    ariaLabel: "Créer une nouvelle demande"
  },
  {
    title: "Demandes",
    path: "/certification-requests",
    icon: FileSearch,
    permission: "view_all_requests",
    ariaLabel: "Voir les demandes de certification"
  },
  {
    title: "Paramètres de test",
    path: "/test-parameters",
    icon: TestTube,
    permission: "manage_test_parameters",
    ariaLabel: "Gérer les paramètres de test"
  },
  {
    title: "Calcul des frais",
    path: "/fees-calculation",
    icon: Calculator,
    permission: "manage_test_parameters",
    ariaLabel: "Calculer les frais de certification"
  },
  {
    title: "Dossiers",
    path: "/documents",
    icon: FileText,
    permission: "view_certifications",
    ariaLabel: "Voir les dossiers de certification"
  },
  {
    title: "Certifications",
    path: "/certifications",
    icon: FileCheck,
    permission: "view_certifications",
    ariaLabel: "Accéder aux certifications"
  },
  {
    title: "Inspections",
    path: "/inspections",
    icon: Calendar,
    permission: "perform_inspection",
    ariaLabel: "Gérer les inspections"
  },
  {
    title: "Normes",
    path: "/standards",
    icon: BadgeCheck,
    permission: "view_certifications",
    ariaLabel: "Consulter les normes"
  },
  {
    title: "Laboratoires",
    path: "/laboratories",
    icon: ClipboardCheck,
    permission: "assign_laboratories",
    ariaLabel: "Gérer les laboratoires"
  },
  {
    title: "Paiements",
    path: "/payments",
    icon: CreditCard,
    permission: "manage_payments",
    ariaLabel: "Gérer les paiements"
  },
  {
    title: "Utilisateurs",
    path: "/users",
    icon: Users,
    permission: "manage_users",
    ariaLabel: "Gérer les utilisateurs"
  },
  {
    title: "Entreprises",
    path: "/companies",
    icon: Building,
    permission: "view_all_requests",
    ariaLabel: "Gérer les entreprises"
  },
  {
    title: "Rapports",
    path: "/reports",
    icon: BarChart,
    permission: "view_reports",
    ariaLabel: "Voir les rapports"
  },
  {
    title: "Historique",
    path: "/history",
    icon: Clock,
    ariaLabel: "Consulter l'historique"
  },
];

export const getAccountMenuItems = (): MenuItemType[] => [
  {
    title: "Profil",
    path: "/profile",
    icon: User,
    ariaLabel: "Accéder à votre profil"
  },
  {
    title: "Paramètres",
    path: "/settings",
    icon: Settings,
    permission: "manage_settings",
    ariaLabel: "Modifier les paramètres"
  },
];
