import React, { Dispatch, SetStateAction } from 'react';

export interface IGlobalContextType {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

export interface IGlobalProviderProps {
  children: React.ReactNode;
}
