import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../services/authService";

function ProtectedRoute({ children, roleRequired }) {
    const token = getToken();
    const role = getRole();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (roleRequired && role !== roleRequired) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;