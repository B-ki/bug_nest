import { useLocalStorage } from '@/hooks/useLocalStorage';
import { createContext, useEffect, useMemo, useState } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import jwt_decode from 'jwt-decode';
import ApiClient from '@/utils/apiAxios';
import { userDto } from '@/dto/userDto';
import { jwtToken } from '@/dto/jwtToken';

interface AuthContextType {
  user?: userDto;
  loading: boolean;
  error?: unknown;
  login_42: () => void;
  logout: () => void;
  settingUser: (user: Promise<void | userDto>) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  const [user, setUser] = useState<null | userDto>(null);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(false);


  const location = useLocation();


  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname]);

  useEffect(() => {
    setLoadingInitial(false);
  }, []);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const login_42 = () => {
    setLoading(true);
    window.location.href = `${window.location.origin}/oauth-callback`;
    setLoading(false); 
  };

  const settingUser = async (user: Promise<void | userDto>) => {
    if (user) {
      setUser(user);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login_42,
      logout,
      settingUser,
    }),
    [user, loading, error, login_42, /*login_42, register,*/ logout, settingUser],
  );

  return (
    <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>
  );
}
