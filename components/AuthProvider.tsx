'use client';
import { SessionProvider } from 'next-auth/react';
import { IAuthProviderProps } from '@/types/components/IAuthProvider';

const AuthProvider = ({ children }: IAuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
