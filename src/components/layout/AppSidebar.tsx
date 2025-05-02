
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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
  BadgeCheck
} from "lucide-react";
import Logo from '../ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItemType {
  title: string;
  path: string;
  icon: React.ElementType;
  permission?: string;
}

const AppSidebar = () => {
  const { hasPermission } = useAuth();
  const location = useLocation();

  const menuItems: MenuItemType[] = [
    {
      title: "Tableau de bord",
      path: "/",
      icon: Home,
    },
    {
      title: "Dossiers",
      path: "/documents",
      icon: FileText,
      permission: "view_certifications",
    },
    {
      title: "Certifications",
      path: "/certifications",
      icon: FileCheck,
      permission: "view_certifications",
    },
    {
      title: "Inspections",
      path: "/inspections",
      icon: Calendar,
      permission: "perform_inspection",
    },
    {
      title: "Normes",
      path: "/standards",
      icon: BadgeCheck,
      permission: "view_certifications",
    },
    {
      title: "Paiements",
      path: "/payments",
      icon: CreditCard,
      permission: "manage_payments",
    },
    {
      title: "Utilisateurs",
      path: "/users",
      icon: Users,
      permission: "manage_users",
    },
    {
      title: "Rapports",
      path: "/reports",
      icon: BarChart,
      permission: "view_reports",
    },
    {
      title: "Historique",
      path: "/history",
      icon: Clock,
    },
  ];

  const accountItems: MenuItemType[] = [
    {
      title: "Profil",
      path: "/profile",
      icon: User,
    },
    {
      title: "Paramètres",
      path: "/settings",
      icon: Settings,
      permission: "manage_settings",
    },
  ];

  // Filtrer les éléments du menu en fonction des permissions
  const filteredMenuItems = menuItems.filter(
    item => !item.permission || hasPermission(item.permission)
  );

  const filteredAccountItems = accountItems.filter(
    item => !item.permission || hasPermission(item.permission)
  );

  // Vérifier si un chemin est actif
  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isPathActive(item.path)}
                  >
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Compte</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredAccountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isPathActive(item.path)}
                  >
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-2 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
