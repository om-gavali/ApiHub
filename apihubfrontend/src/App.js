import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import AdminDashboard from "./admin/AdminDashboard";
import APIs from "./admin/APIs";
import Users from "./admin/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import { getToken, getRole } from "./services/authService";
import Navbar from "./components/Navbar";

const DefaultRoute = () => {
  const token = getToken();
  const role = getRole();
  if (!token) return <Navigate to="/login" replace />;
  if (role === "ADMIN") return <Navigate to="/admin" replace />;
  return <Navigate to="/dashboard" replace />;
};

const LoginRoute = () => {
  const token = getToken();
  const role = getRole();
  if (token) {
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <Login />;
};

const RegisterRoute = () => {
  const token = getToken();
  const role = getRole();
  if (token) {
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <Register />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<DefaultRoute />}
        />

        <Route
          path="/login"
          element={<LoginRoute />}
        />

        <Route
          path="/register"
          element={<RegisterRoute />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roleRequired="USER">
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute roleRequired="USER">
              <Navbar />
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <Navbar />
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apis"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <Navbar />
              <APIs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <Navbar />
              <Users />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;