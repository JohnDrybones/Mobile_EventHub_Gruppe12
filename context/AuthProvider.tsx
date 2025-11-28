import {
  type User,
  getUser,
  loginAndGetUser,
  logout,
  signUpAndLogin,
} from "@/providers/appwrite/auth";

import { createContext, useContext, useEffect, useState } from "react";
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoaded: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false, error: "AuthProvider not initialized" }),
  register: async (email, password, admin) => { },
  logout: async () => { },
  isAdmin: false,
  isLoggedIn: false,
  isLoaded: false,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const resetLoading = () => {
    setLoading(false);
    setIsLoaded(true);
  };

  const setLoadings = () => {
    setLoading(true);
    setIsLoaded(false);
  };

  useEffect(() => {
    const init = async () => {
      setLoadings();
      const result = await getUser();
      setUser(result.success ? result.data : null);
      resetLoading();
    };
    init();
  }, []);

  const loginUser = async (email: string, password: string) => {
    setLoadings();
    const result = await loginAndGetUser(email, password);
    if (result.success) {
      setUser(result.data);
      resetLoading();
      return { success: true };
    }
    setUser(null);
    resetLoading();
    return { success: false, error: result.error };
  };

  const registerUser = async (email: string, password: string) => {
    setLoadings();
    const result = await signUpAndLogin(email, password);
    setUser(result.success ? result.data : null);
    resetLoading();
  };

  const logoutUser = async () => {
    setLoadings();
    await logout();
    setUser(null);
    resetLoading();
  };

  // Registreringsfunksjon - simulerer API-kall
  const registerUser = async (email: string, password: string, admin: boolean) => {
    setLoadings();
    const result = await signUpAndLogin(email, password);
    setUser(result.success ? result.data : null);
    resetLoading();
  };

  // Returnerer kontekstprovideren med alle nødvendige verdier
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: loading,
        isLoggedIn: user !== null,
        isLoaded,
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
