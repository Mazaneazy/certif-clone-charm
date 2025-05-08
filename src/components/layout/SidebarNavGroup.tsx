
import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { MenuItemType } from './SidebarMenu';
import SidebarNavItem from './SidebarNavItem';

interface SidebarNavGroupProps {
  title: string;
  items: MenuItemType[];
  isPathActive: (path: string) => boolean;
}

const SidebarNavGroup = ({ title, items, isPathActive }: SidebarNavGroupProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarNavItem 
              key={item.title}
              item={item} 
              isActive={isPathActive(item.path)} 
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNavGroup;
