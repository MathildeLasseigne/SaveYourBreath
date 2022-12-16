import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const RequireLogin = ({ children }) => {
    const { authed } = useAuth();
    return authed === true ? (
        children
    ) : (
    <Navigate to="/login" />
    );
}

export default RequireLogin;