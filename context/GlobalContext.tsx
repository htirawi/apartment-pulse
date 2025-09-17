'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const contextValue: GlobalContextType = { unreadCount, setUnreadCount };
  
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
