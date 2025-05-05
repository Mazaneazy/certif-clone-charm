
import React from 'react';
import { Toaster } from 'sonner';

// Création d'un contexte vide pour le provider
const ToastContext = React.createContext({});

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
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast doit être utilisé à l\'intérieur d\'un ToastProvider');
  }
  return context;
};
