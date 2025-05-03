
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users as UsersIcon,
  PlusCircle,
  UserCog,
  Search,
  Mail,
  User,
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types d'utilisateurs
const USER_TYPES = [
  { id: 'admin', name: 'Administrateur', permissions: ['*'] },
  { id: 'accueil', name: 'Poste Accueil', permissions: ['register_requests', 'view_all_requests'] },
  { id: 'responsable_technique', name: 'Responsable Technique', permissions: ['view_all_requests', 'manage_test_parameters', 'assign_laboratories', 'review_reports'] },
  { id: 'laboratoire', name: 'Laboratoire', permissions: ['upload_test_results', 'view_assigned_tests'] },
  { id: 'chef_inspections', name: 'Chef des Inspections', permissions: ['assign_inspectors', 'manage_inspections', 'view_all_requests'] },
  { id: 'directeur_evaluation', name: 'Directeur Évaluation', permissions: ['make_final_decisions', 'view_all_requests', 'view_all_reports'] },
  { id: 'inspecteur', name: 'Inspecteur', permissions: ['perform_inspection', 'view_certifications'] },
  { id: 'comptable', name: 'Comptable', permissions: ['manage_payments', 'view_certifications'] },
];

// Données de démonstration pour les utilisateurs
const demoUsers = [
  {
    id: 1,
    name: 'Admin ANOR',
    email: 'admin@anor.cm',
    role: 'admin',
    department: 'Administration',
    lastActive: '2025-04-30',
    status: 'active',
    avatar: '' // Added avatar property
  },
  {
    id: 8,
    name: 'Réception ANOR',
    email: 'accueil@anor.cm',
    role: 'accueil',
    department: 'Accueil',
    lastActive: '2025-05-02',
    status: 'active',
    avatar: '' // Added avatar property
  },
  {
    id: 9,
    name: 'Resp. Technique',
    email: 'technique@anor.cm',
    role: 'responsable_technique',
    department: 'Technique',
    lastActive: '2025-05-01',
    status: 'active',
    avatar: '' // Added avatar property
  },
  {
    id: 10,
    name: 'Laboratoire Tests',
    email: 'laboratoire@anor.cm',
    role: 'laboratoire',
    department: 'Laboratoire',
    lastActive: '2025-04-25',
    status: 'active',
    avatar: '' // Added avatar property
  },
  {
    id: 11,
    name: 'Chef Inspections',
    email: 'inspections@anor.cm',
    role: 'chef_inspections',
    department: 'Inspections',
    lastActive: '2025-04-29',
    status: 'active',
    avatar: '' // Added avatar property
  },
  {
    id: 12,
    name: 'Dir. Évaluation',
    email: 'evaluations@anor.cm',
    role: 'directeur_evaluation',
    department: 'Évaluation',
    lastActive: '2025-04-28',
    status: 'active',
    avatar: '' // Added avatar property
  }
];

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users] = useState(demoUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | typeof demoUsers[0]>(null);

  const handleCreateUser = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La création d'utilisateur sera bientôt disponible.",
    });
  };

  const handleViewUser = (user: typeof demoUsers[0]) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Filtrer les utilisateurs
  const filteredUsers = users.filter(user => {
    // Filtrer par rôle
    if (roleFilter !== 'all' && user.role !== roleFilter) {
      return false;
    }
    
    // Filtrer par terme de recherche (nom ou email)
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const getRoleBadge = (role: string) => {
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

  const getRoleDescription = (role: string) => {
    const roleType = USER_TYPES.find(t => t.id === role);
    if (roleType) {
      return roleType.name;
    }
    return role;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getPermissionsList = (role: string) => {
    const roleType = USER_TYPES.find(t => t.id === role);
    if (roleType) {
      return roleType.permissions;
    }
    return [];
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-green-100 text-green-800 border-green-300">Actif</Badge>;
    }
    return <Badge variant="outline">Inactif</Badge>;
  };

  return (
    <AppLayout requiredPermission="manage_users">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
            <p className="text-muted-foreground">Gestion des utilisateurs et des droits d'accès</p>
          </div>
          <Button onClick={handleCreateUser} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 self-start sm:self-auto">
            <PlusCircle className="h-4 w-4" />
            <span>Nouvel utilisateur</span>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select 
            onValueChange={setRoleFilter} 
            defaultValue="all"
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Type d'utilisateur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {USER_TYPES.map(type => (
                <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="border rounded-lg overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]"></TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Département</TableHead>
                  <TableHead className="hidden md:table-cell">Dernière activité</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground mt-1 md:hidden">{user.email}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.department}</TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(user.lastActive).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleViewUser(user)}
                      >
                        <UserCog className="h-4 w-4 mr-1" />
                        <span>Détails</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
            <div className="text-center">
              <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">Aucun utilisateur trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">Réinitialisez les filtres ou créez un nouvel utilisateur</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => { setSearchTerm(''); setRoleFilter('all'); }} variant="outline">
                  Réinitialiser les filtres
                </Button>
                <Button onClick={handleCreateUser}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Créer un utilisateur
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de l'utilisateur</DialogTitle>
                <DialogDescription>
                  Informations concernant l'utilisateur et ses permissions
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback className="text-lg">{getInitials(selectedUser.name)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center mt-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 mr-1.5" />
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                        <span>{selectedUser.department}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Type d'utilisateur</div>
                      <div className="font-medium mt-0.5">{getRoleDescription(selectedUser.role)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Statut</div>
                      <div className="font-medium mt-0.5">{getStatusBadge(selectedUser.status)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Dernière activité</div>
                      <div className="font-medium mt-0.5">{new Date(selectedUser.lastActive).toLocaleDateString('fr-FR')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">ID utilisateur</div>
                      <div className="font-medium mt-0.5">{selectedUser.id}</div>
                    </div>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center mb-2">
                      <ShieldCheck className="h-4 w-4 mr-1.5 text-blue-600" />
                      <div className="font-medium">Permissions</div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {getPermissionsList(selectedUser.role).map((permission, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Badge variant="outline" className="bg-gray-50">
                            {permission === '*' ? 'Toutes les permissions' : permission}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
                    Fermer
                  </Button>
                  <Button size="sm" className="bg-anor-blue hover:bg-blue-800" onClick={() => {
                    toast({
                      title: "Fonctionnalité à venir",
                      description: "La modification des utilisateurs sera bientôt disponible.",
                    });
                  }}>
                    Modifier
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Users;
