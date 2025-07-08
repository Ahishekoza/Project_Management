"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, createContext, useEffect, useState } from "react";

// --- login and logout function
// --- check session function and renew session before 2 minutes of expiration

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  const login = async (userData) => {
    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include"
    })

    const { success } = await response.json()
    if (success) {
      setUser(null);
      sessionStorage.setItem("showLogoutToast", true)
      router.replace("/");
    }


  };

  const checkSession = async () => {
    setLoading(true)
    try {

      const response = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include"
      })

      if (response.status === 200) {
        // ---Add Parameter IsAuthenticated
      }
      else {
        sessionStorage.setItem("showSessionExpired", true)
        logout()
      }
    } catch (error) {
      sessionStorage.setItem("showSessionExpired", true)
      logout()
    }
    finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    const interval = setInterval(() => checkSession(), 5 * 60 * 1000)
    
    // ---initial check on mount 
    checkSession()

    return () => clearInterval(interval)
  }, [])

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
