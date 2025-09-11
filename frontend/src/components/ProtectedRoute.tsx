import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type {JSX} from "react";


interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>; // oder ein Spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
