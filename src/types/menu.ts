
import { type ElementType } from "react";

export interface MenuItemType {
  title: string;
  path: string;
  icon: ElementType;
  permission?: string;
  ariaLabel?: string;
  roles?: string[]; // Rôles qui peuvent voir cet élément de menu
}
