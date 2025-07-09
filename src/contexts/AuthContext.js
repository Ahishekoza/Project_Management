"use client";

import { useRouter } from "next/navigation";
import { useContext, createContext, useEffect, useState } from "react";
import { toast } from "sonner";

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
      console.log(data)
      if (!response.ok  ) {
        data?.error === "password"? toast.error("Incorrect Password!") :toast.error("User Not Present!!")
        return { success: false, user: null }; 
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
  const checkSession = async (isInitialCheck = false) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/session", {
        method: "GET",
        credentials: "include"
      });

      const{user} = await response.json()

      if (response.status === 200) {
        // ---Add Parameter IsAuthenticated
        setUser(user)
      }
      else {
        // Only logout and store session if it's not the initial check
        if (!isInitialCheck) {
          sessionStorage.setItem("showSessionExpired", true);
        }
        logout();
      }
    } catch (error) {
      // Only logout and store session if it's not the initial check
      if (!isInitialCheck) {
        sessionStorage.setItem("showSessionExpired", true);
        logout();
      }
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => checkSession(), 5 * 60 * 1000);


    checkSession(true);

    return () => clearInterval(interval);
  }, []);

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
