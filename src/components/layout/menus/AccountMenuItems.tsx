
import React from 'react';
import { User, Settings } from "lucide-react";
import { MenuItemType } from "@/types/menu";

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
