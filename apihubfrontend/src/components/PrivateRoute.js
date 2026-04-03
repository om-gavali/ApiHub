import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const decoded = parseJwt(token);
  const roles = decoded?.roles || [];

  if (!roles.includes("ADMIN")) {
    return <Navigate to="/" />;
  }

  return children;
}