
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useToast } from '@/hooks/use-toast';
import { demoUsers } from '@/components/users/UserTypeConstants';
import UserHeader from '@/components/users/UserHeader';
import UserFilters from '@/components/users/UserFilters';
import UserTable from '@/components/users/UserTable';
import EmptyUserState from '@/components/users/EmptyUserState';
import UserDetailsDialog from '@/components/users/UserDetailsDialog';

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  lastActive: string;
  status: string;
  avatar: string;
}

const Users = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [users] = useState<UserType[]>(demoUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | UserType>(null);

  const handleCreateUser = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La création d'utilisateur sera bientôt disponible.",
    });
  };

  const handleViewUser = (user: UserType) => {
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

  const resetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
  };

  return (
    <AppLayout requiredPermission="manage_users">
      <div className="space-y-6">
        <UserHeader onCreateUser={handleCreateUser} />
        
        <UserFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
        />

        {filteredUsers.length > 0 ? (
          <UserTable 
            users={filteredUsers} 
            onViewUser={handleViewUser} 
          />
        ) : (
          <EmptyUserState 
            onResetFilters={resetFilters} 
            onCreateUser={handleCreateUser} 
          />
        )}
      </div>

      <UserDetailsDialog 
        isOpen={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        user={selectedUser} 
      />
    </AppLayout>
  );
};

export default Users;
