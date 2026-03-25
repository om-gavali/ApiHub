import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}

export default PrivateRoute;