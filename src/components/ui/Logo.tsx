
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
        <span className="text-white font-bold text-lg">CF</span>
      </div>
      <span className="text-blue-600 font-bold text-lg">CertifFlow</span>
    </div>
  );
};

export default Logo;
