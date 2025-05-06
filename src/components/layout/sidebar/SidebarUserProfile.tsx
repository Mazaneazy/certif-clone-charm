
import React from 'react';
import { User } from '@/types/auth';

interface SidebarUserProfileProps {
  user: User | null;
}

const SidebarUserProfile = ({ user }: SidebarUserProfileProps) => {
  if (!user) return null;
  
  return (
    <div className="px-3 py-2">
      <div className="rounded-md bg-muted p-3 mb-3">
        <div className="text-sm font-medium">{user.name}</div>
        <div className="text-xs text-muted-foreground">{user.department || 'Externe'}</div>
      </div>
    </div>
  );
};

export default SidebarUserProfile;
