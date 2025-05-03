
import { USER_TYPES } from './UserTypeConstants';
import { Badge } from "@/components/ui/badge";

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return <Badge className="bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200">Administrateur</Badge>;
    case 'accueil':
      return <Badge className="bg-green-100 text-green-800 border-green-300 hover:bg-green-200">Accueil</Badge>;
    case 'responsable_technique':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200">Resp. Technique</Badge>;
    case 'laboratoire':
      return <Badge className="bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200">Laboratoire</Badge>;
    case 'chef_inspections':
      return <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200">Chef Inspections</Badge>;
    case 'directeur_evaluation':
      return <Badge className="bg-red-100 text-red-800 border-red-300 hover:bg-red-200">Dir. Évaluation</Badge>;
    case 'inspecteur':
      return <Badge className="bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200">Inspecteur</Badge>;
    case 'comptable':
      return <Badge className="bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200">Comptable</Badge>;
    default:
      return <Badge variant="outline">{role}</Badge>;
  }
};

export const getRoleDescription = (role: string) => {
  const roleType = USER_TYPES.find(t => t.id === role);
  if (roleType) {
    return roleType.name;
  }
  return role;
};

export const getPermissionsList = (role: string) => {
  const roleType = USER_TYPES.find(t => t.id === role);
  if (roleType) {
    return roleType.permissions;
  }
  return [];
};

export const getStatusBadge = (status: string) => {
  if (status === 'active') {
    return <Badge className="bg-green-100 text-green-800 border-green-300">Actif</Badge>;
  }
  return <Badge variant="outline">Inactif</Badge>;
};
