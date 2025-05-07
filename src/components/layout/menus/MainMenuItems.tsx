
import { MenuItemType } from "@/types/menu";
import { getDashboardMenuItems } from './items/DashboardMenuItems';
import { getRequestMenuItems } from './items/RequestMenuItems';
import { getTechnicalMenuItems } from './items/TechnicalMenuItems';
import { getEvaluationMenuItems } from './items/EvaluationMenuItems';
import { getAdminMenuItems } from './items/AdminMenuItems';

export const getMainMenuItems = (): MenuItemType[] => [
  ...getDashboardMenuItems(),
  ...getRequestMenuItems(),
  ...getTechnicalMenuItems(),
  ...getEvaluationMenuItems(),
  ...getAdminMenuItems()
];
