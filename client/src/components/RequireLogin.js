import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const RequireLogin = ({ children }) => {
    const { user } = useAuth();
    return user ? (
        children
    ) : (
        <Navigate to="/login" />
    );
}

export default RequireLogin;