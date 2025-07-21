import Cookies from "js-cookie";

import React, { createContext, useContext, useState } from "react";
import { useLoginMutation } from "@/state/api";
import { useNavigate } from "react-router";

interface AuthContextType {
  currentUser: {
    id: string;
    email: string;
    roles: { id: string; name: string }[];
  } | null;
  token: string | null;
  saveToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  saveCurrentUser: (user: {
    id: string;
    email: string;
    roles: { id: string; name: string }[];
  }) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
    roles: { id: string; name: string }[];
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    await loginUser({ user: { email, password } });
  };

  const saveCurrentUser = (user: {
    id: string;
    email: string;
    roles: { id: string; name: string }[];
  }): void => {
    setCurrentUser(user);
  };

  const saveToken = async (token: string) => {
    setToken(token);
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setToken(null);

    navigate("/login", { replace: true });
  };

  const value: AuthContextType = {
    currentUser,
    token,
    saveToken,
    login,
    loading: isLoading,
    logout,
    saveCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
