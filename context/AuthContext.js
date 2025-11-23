import { createContext, useEffect, useState } from "react";
import { getToken, removeToken, saveToken } from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore token on app launch
  useEffect(() => {
    async function loadToken() {
      const token = await getToken();
      if (token) {
        setUser({ token }); // You could decode it or fetch user profile
      }
      setLoading(false);
    }
    loadToken();
  }, []);

  const login = async (token) => {
    await saveToken(token);
    setUser({ token });
  };

  const logout = async () => {
    await removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
