
import React from 'react';
import { UserCheck, CheckSquare, Send, TestTube } from "lucide-react";
import { MenuItemType } from "@/types/menu";

export const getTechnicalMenuItems = (): MenuItemType[] => [
  // Étape 3: Responsable technique et Comité
  {
    title: "Comités techniques",
    path: "/technical-committees",
    icon: UserCheck,
    permission: "manage_committees",
    ariaLabel: "Gérer les comités techniques",
    roles: ['responsable_technique', 'chef_comite', 'admin']
  },
  
  // Fonctionnalité du responsable technique pour valider les paiements
  {
    title: "Valider paiements",
    path: "/payment-validation",
    icon: CheckSquare,
    permission: "manage_fees",
    ariaLabel: "Valider les paiements reçus",
    roles: ['responsable_technique', 'admin', 'comptable']
  },
  
  // Fonctionnalité du responsable technique pour transmettre les rapports
  {
    title: "Transmettre rapports",
    path: "/report-transmission",
    icon: Send,
    permission: "view_reports",
    ariaLabel: "Transmettre des rapports au Directeur",
    roles: ['responsable_technique', 'admin']
  },
  
  // Étape 4: Pour le comité et le responsable technique
  {
    title: "Paramètres de test",
    path: "/test-parameters",
    icon: TestTube,
    permission: "manage_test_parameters",
    ariaLabel: "Gérer les paramètres de test",
    roles: ['responsable_technique', 'chef_comite', 'directeur_evaluation', 'admin']
  }
];
