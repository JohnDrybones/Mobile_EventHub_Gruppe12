import { createContext, ReactNode, useContext, useState } from 'react';

const AuthContext = createContext({ loggedIn: false, setLoggedIn: (v: boolean) => {} });

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false); 
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useLoggedIn() {
  return useContext(AuthContext);
}
