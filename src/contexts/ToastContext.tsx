
import React, { createContext, useContext } from 'react';
import { Toaster } from '@/components/ui/sonner';

// Création d'un contexte vide pour le provider
const ToastContext = createContext({});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <ToastContext.Provider value={{}}>
        {children}
      </ToastContext.Provider>
    </>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast doit être utilisé à l\'intérieur d\'un ToastProvider');
  }
  return context;
};
