
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <img 
          src="/lovable-uploads/f5ac6b13-bbfd-43a0-8989-5580dcdb2328.png" 
          alt="ANOR Logo - Agence des Normes et de la Qualité" 
          className="h-12 w-auto"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white hidden md:block" />
      </div>
      <div className="flex flex-col">
        <span className="text-anor-blue font-bold text-lg hidden md:inline">ANOR Certification</span>
        <span className="text-xs text-anor-darkBlue hidden md:inline">Agence des Normes et de la Qualité</span>
      </div>
    </div>
  );
};

export default Logo;
