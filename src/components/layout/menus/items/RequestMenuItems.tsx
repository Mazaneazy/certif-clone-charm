
import React from 'react';
import { FileInput, FileSearch, FileText } from "lucide-react";
import { MenuItemType } from "@/types/menu";

export const getRequestMenuItems = (): MenuItemType[] => [
  // Étape 1: Accueil - Enregistrement initial
  {
    title: "Nouvelle demande",
    path: "/certification-request",
    icon: FileInput,
    permission: "register_requests",
    ariaLabel: "Créer une nouvelle demande",
    roles: ['gestionnaire', 'accueil', 'admin', 'producteur']
  },
  
  // Visible par tous pour suivre les demandes
  {
    title: "Demandes",
    path: "/certification-requests",
    icon: FileSearch,
    permission: "view_all_requests",
    ariaLabel: "Voir les demandes de certification",
    roles: ['gestionnaire', 'admin', 'accueil', 'responsable_technique', 'chef_inspections', 'directeur_evaluation']
  },
  
  // Étape 2: Gestionnaire - Évaluation préliminaire
  {
    title: "Dossiers à évaluer",
    path: "/evaluation-preliminary",
    icon: FileText,
    permission: "evaluate_requests",
    ariaLabel: "Évaluer les dossiers",
    roles: ['gestionnaire', 'admin']
  }
];
