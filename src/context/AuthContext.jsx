import { createContext, useState, useEffect, useContext } from "react";
import api from "../service/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const oldToken = localStorage.getItem("token");
    if (oldToken && !sessionStorage.getItem("access_token")) {
      localStorage.removeItem("token");
    }

    const savedToken = sessionStorage.getItem("access_token");
    const savedRefreshToken = localStorage.getItem("refresh_token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedRefreshToken) {
      setToken(savedToken);
      setRefreshToken(savedRefreshToken);

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (err) {
          console.error("Failed to parse saved user data:", err);
          localStorage.removeItem("user");
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/", { email, password });
      const { access_token, refresh_token } = res.data;

      if (access_token && refresh_token) {
        setToken(access_token);
        setRefreshToken(refresh_token);
        sessionStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        const userProfile = await fetchUserProfile(access_token);

        if (userProfile) {
        } else {
          const userData = {
            email: email,
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
        return true;
      } else {
        console.error("No tokens received from API");
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);

      logout();
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    sessionStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const fetchUserProfile = async (accessToken = null) => {
    try {
      const tokenToUse = accessToken || token;
      if (!tokenToUse) {
        console.error("No token available for profile fetch");
        return null;
      }

      const res = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${tokenToUse}`,
        },
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.error(
        "Failed to fetch user profile:",
        err.response?.data || err.message
      );
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        login,
        logout,
        loading,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Helper hook
export const useAuth = () => useContext(AuthContext);
