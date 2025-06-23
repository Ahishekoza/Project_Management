"use client";

import { useRouter } from "next/navigation";
import { useContext, createContext, useEffect, useState } from "react";

// --- login and logout function
// --- check session function and renew session before 2 minutes of expiration

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const setCookie = (name, value, minutes = 10) => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + minutes);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  };

  const removeCookie = (name) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  };

  const createSession = (userData, expirationMinutes = 10) => {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expirationMinutes);

    const session = {
      user: userData,
      expiresAt: expiresAt.toISOString(), // ✅ call the function
    };

    setCookie("auth-session", JSON.stringify(session), expirationMinutes);
    setUser(userData);
    return { session, success: true };
  };

  const checkSession = () => {
    const cookie = getCookie("auth-session");

    if (!cookie) {
      setLoading(false); // 👈 done checking
      logout();
      return;
    }

    let session;
    try {
      session = JSON.parse(decodeURIComponent(cookie));
    } catch (e) {
      setLoading(false);
      logout();
      return;
    }
console.log(session.user)
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);

    if (now > expiresAt) {
      setLoading(false);
      logout();
    } else {
      setUser(session.user);
      const timeLeft = expiresAt - now;
      const twoMinutes = 2 * 60 * 1000;

      if (timeLeft < twoMinutes) {
        createSession(session.user);
      }

      setLoading(false); // ✅ only here after session is valid
    }
  };

  const login = (userData) => {
    return createSession(userData);
  };

  const logout = () => {
    removeCookie("auth-session");
    setUser(null);
    router.push("/");
  };

  // Initial Check
  useEffect(() => {
    checkSession();
  }, []);

  // Periodic check
  useEffect(() => {
    const interval = setTimeout(() => checkSession(), 60000);

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
