import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    return localStorage.getItem("access") !== null ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
