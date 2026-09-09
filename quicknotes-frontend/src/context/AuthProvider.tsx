import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import SDK, { type LoginData, type RegisterData } from "../sdk/api";

export const AuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("access"),);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const login = async (loginData: LoginData) => {
    try {
      const res = await SDK.login(loginData);
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      const res = await SDK.register(registerData);
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      navigate("/");
    } catch (err) {
      console.log("Registration failed.", err);
    }
  };

  return (
    <AuthContext value={{ isAuthenticated, logout, login, register }}>
      <Outlet />
    </AuthContext>
  );
};
