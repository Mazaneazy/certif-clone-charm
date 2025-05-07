
import React from 'react';
import { CreditCard, Building, BadgeCheck, TestTube, Users, BarChart, Clock, HelpCircle } from "lucide-react";
import { MenuItemType } from "@/types/menu";

export const getAdminMenuItems = (): MenuItemType[] => [
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
