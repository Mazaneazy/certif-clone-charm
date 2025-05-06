
import { MenuItemType } from '@/types/menu';
import { getMainMenuItems } from '../menus/MainMenuItems';
import { getAccountMenuItems } from '../menus/AccountMenuItems';

// Export menu retrieving functions
export const getFilteredMenuItems = (
  items: MenuItemType[],
  hasPermission: (permission: string) => boolean
): MenuItemType[] => {
  return items.filter(
    item => !item.permission || hasPermission(item.permission)
  );
};

export { MenuItemType, getMainMenuItems, getAccountMenuItems };
