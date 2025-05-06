
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { MenuItemType } from '@/types/menu';

interface SidebarNavItemProps {
  item: MenuItemType;
  isActive: boolean;
}

const SidebarNavItem = ({ item, isActive }: SidebarNavItemProps) => {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        tooltip={item.title}
      >
        <Link 
          to={item.path} 
          className="flex items-center"
          aria-label={item.ariaLabel || item.title}
          aria-current={isActive ? "page" : undefined}
        >
          <item.icon className="mr-2 h-5 w-5" aria-hidden="true" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SidebarNavItem;
