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
  BadgeCheck,
  FileSearch,
  Calculator,
  TestTube, // Replaced Flask with TestTube
  FileInput,
  ClipboardCheck,
  Building
} from "lucide-react";
import Logo from '../ui/Logo';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItemType {
  title: string;
  path: string;
  icon: React.ElementType;
  permission?: string;
  ariaLabel?: string;
}

const AppSidebar = () => {
  const { hasPermission, user } = useAuth();
  const location = useLocation();

  const menuItems: MenuItemType[] = [
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

  const accountItems: MenuItemType[] = [
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
      <SidebarHeader className="flex items-center justify-center p-4 border-b border-sidebar-border">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {user && (
          <div className="px-3 py-2">
            <div className="rounded-md bg-muted p-3 mb-3">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.department || 'Externe'}</div>
            </div>
          </div>
        )}
        
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isPathActive(item.path)}
                    tooltip={item.title}
                  >
                    <Link 
                      to={item.path} 
                      className="flex items-center"
                      aria-label={item.ariaLabel || item.title}
                      aria-current={isPathActive(item.path) ? "page" : undefined}
                    >
                      <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
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
                    tooltip={item.title}
                  >
                    <Link 
                      to={item.path} 
                      className="flex items-center"
                      aria-label={item.ariaLabel || item.title}
                      aria-current={isPathActive(item.path) ? "page" : undefined}
                    >
                      <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
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
