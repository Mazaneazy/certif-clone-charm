
// This file is now just re-exporting from the menus files
import { getMainMenuItems } from './menus/MainMenuItems';
import { getAccountMenuItems } from './menus/AccountMenuItems';
import { type MenuItemType } from '@/types/menu';

// Re-export the menu items and types
export { type MenuItemType };
export { getMainMenuItems, getAccountMenuItems };
