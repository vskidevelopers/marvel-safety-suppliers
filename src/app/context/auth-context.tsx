// context/auth-context.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuthenticationFunctions, auth } from "@/lib/firebase";


interface AuthContextType {
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { login, logout } = useAuthenticationFunctions();
  // Check if already logged in (from localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("marvel-auth");
    console.log("AUTH >> ", auth);

    if (stored === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [isAuthenticated]);

  const signin = async (email: string, password: string): Promise<boolean> => {

    try {
      // Call the login function from Firebase
      const result = await login(email, password);
      if (!result) {
        return false;
      } else if (result?.success) {
        // log("Login successful for user:", result.loggedInUser?.email);
        console.log("Login successful for user:", result.loggedInUser?.email);
        setIsAuthenticated(true);
        localStorage.setItem("marvel-auth", "true");
      }
      return true;
    } catch (error) {
      // log("Login failed with error:", error);
      console.error("Login failed with error:", error);
    }


    return false;
  };

  const signout = () => {
    try {
      logout();
      setIsAuthenticated(false);
      localStorage.removeItem("marvel-auth");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed with error:", error);
    }
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}