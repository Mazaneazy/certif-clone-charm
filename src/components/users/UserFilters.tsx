
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { USER_TYPES } from './UserTypeConstants';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string) => void;
}

const UserFilters = ({ 
  searchTerm, 
  onSearchChange, 
  roleFilter, 
  onRoleFilterChange 
}: UserFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un utilisateur..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select 
        value={roleFilter}
        onValueChange={onRoleFilterChange}
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
  );
};

export default UserFilters;
