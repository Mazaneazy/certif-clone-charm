
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

const MobileToggle = () => {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Button
      variant="outline"
      size="icon"
      className="md:hidden"
      onClick={() => setOpenMobile(!openMobile)}
      aria-label="Ouvrir le menu de navigation"
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">Menu de navigation</span>
    </Button>
  );
};

export default MobileToggle;
