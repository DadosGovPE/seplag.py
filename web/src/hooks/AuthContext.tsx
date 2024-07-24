// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '../service/api';

interface AuthContextType {
  user: any; // Ajuste conforme necessário
  signed: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("@Auth:user");
    const savedToken = localStorage.getItem("@Auth:token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post('/admin-login', { email, password });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setUser(response.data.user);
        setToken(response.data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        localStorage.setItem("@Auth:token", response.data.token);
        localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
