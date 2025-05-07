
import React from 'react';
import { Calculator, Calendar, ClipboardCheck, TestTube, FileCheck } from "lucide-react";
import { MenuItemType } from "@/types/menu";

export const getEvaluationMenuItems = (): MenuItemType[] => [
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
    permission: "perform_inspection",
    ariaLabel: "Planifier les inspections",
    roles: ['chef_inspections', 'admin']
  },
  
  // Nouveau - Programmation des missions pour le chef des inspections
  {
    title: "Programmer missions",
    path: "/inspection-planning",
    icon: ClipboardCheck,
    permission: "plan_inspections",
    ariaLabel: "Programmer des missions d'inspection",
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
  }
];
