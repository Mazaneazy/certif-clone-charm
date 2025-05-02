
import React from 'react';
import { Link } from 'react-router-dom';
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
import { Home, FileText, FileCheck, Clock, Settings, User } from "lucide-react";
import Logo from '../ui/Logo';

const menuItems = [
  {
    title: "Tableau de bord",
    path: "/",
    icon: Home,
  },
  {
    title: "Mes documents",
    path: "/documents",
    icon: FileText,
  },
  {
    title: "Certifications",
    path: "/certifications",
    icon: FileCheck,
  },
  {
    title: "Historique",
    path: "/history",
    icon: Clock,
  },
];

const accountItems = [
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "Paramètres",
    path: "/settings",
    icon: Settings,
  },
];

const AppSidebar = () => {
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
