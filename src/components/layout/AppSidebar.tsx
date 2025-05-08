
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { useAuth } from '@/contexts/AuthContext';
import Logo from '../ui/Logo';
import SidebarUserProfile from './SidebarUserProfile';
import SidebarNavGroup from './SidebarNavGroup';
import { getMainMenuItems, getAccountMenuItems, MenuItemType } from './SidebarMenu';

const AppSidebar = () => {
  const { hasPermission, user } = useAuth();
  const location = useLocation();

  // Filter menu items based on user permissions
  const filterMenuItems = (items: MenuItemType[]): MenuItemType[] => {
    return items.filter(
      item => !item.permission || hasPermission(item.permission)
    );
  };

  const filteredMainMenuItems = filterMenuItems(getMainMenuItems());
  const filteredAccountMenuItems = filterMenuItems(getAccountMenuItems());

  // Check if a path is active
  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <div className="flex items-center justify-center p-4 border-b border-sidebar-border">
        <Logo />
      </div>
      <SidebarContent>
        <SidebarUserProfile user={user} />
        
        <SidebarNavGroup 
          title="Menu" 
          items={filteredMainMenuItems}
          isPathActive={isPathActive} 
        />
        
        <SidebarNavGroup 
          title="Compte" 
          items={filteredAccountMenuItems}
          isPathActive={isPathActive} 
        />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
