
import { getMainMenuItems } from '../menus/MainMenuItems';
import { getAccountMenuItems } from '../menus/AccountMenuItems';
import { type MenuItemType } from '@/types/menu';

// Export menu retrieving functions
export const getFilteredMenuItems = (
  items: MenuItemType[],
  hasPermission: (permission: string) => boolean
): MenuItemType[] => {
  return items.filter(
    item => !item.permission || hasPermission(item.permission)
  );
};

export { getMainMenuItems, getAccountMenuItems };
export type { MenuItemType };
