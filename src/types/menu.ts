
import { type ReactElementType } from "react";

export interface MenuItemType {
  title: string;
  path: string;
  icon: ReactElementType;
  permission?: string;
  ariaLabel?: string;
  roles?: string[]; // Rôles qui peuvent voir cet élément de menu
}
