
import React from 'react';
import { Home } from "lucide-react";
import { MenuItemType } from "@/types/menu";

export const getDashboardMenuItems = (): MenuItemType[] => [
  // Éléments accessibles à tous
  {
    title: "Tableau de bord",
    path: "/",
    icon: Home,
    ariaLabel: "Accéder au tableau de bord"
  }
];
