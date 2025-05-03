
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCog } from "lucide-react";
import { getInitials, getRoleBadge } from './UserUtils';

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

interface UserTableProps {
  users: UserType[];
  onViewUser: (user: UserType) => void;
}

const UserTable = ({ users, onViewUser }: UserTableProps) => {
  return (
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
          {users.map((user) => (
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
                  onClick={() => onViewUser(user)}
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
  );
};

export default UserTable;
