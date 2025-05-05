
import React from 'react';
import { Toaster, toast } from 'sonner';

// Create a ToastContext with the toast function
interface ToastContextType {
  toast: typeof toast;
}

const ToastContext = React.createContext<ToastContextType>({ toast });

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <ToastContext.Provider value={{ toast }}>
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
