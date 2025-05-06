
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import MobileToggle from './header/MobileToggle';
import NotificationsMenu from './header/NotificationsMenu';
import UserMenu from './header/UserMenu';

const AppHeader = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <MobileToggle />

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <NotificationsMenu />
        <UserMenu user={user} />
      </div>
    </header>
  );
};

export default AppHeader;
