
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/f5ac6b13-bbfd-43a0-8989-5580dcdb2328.png" 
        alt="ANOR Logo - Agence des Normes et de la Qualité" 
        className="h-10 w-auto"
      />
      <span className="text-anor-blue font-bold text-lg hidden md:inline">ANOR Certification</span>
    </div>
  );
};

export default Logo;
