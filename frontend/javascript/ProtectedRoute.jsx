import { Navigate, Outlet } from "react-router-dom";
import {useEffect, useState} from "react";
import {sendApiRequest} from "./ApiRequest.jsx";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const fetchAuthentication = async () => {
            try {
                const authData = await sendApiRequest(
                            'http://127.0.0.1:8000/api/auth',
                            'GET',
                            null,
                            false);

                setIsAuthenticated(authData.data.authenticated);
            } catch (err) {
                console.error('Error fetching authorisation:', err);
                setIsAuthenticated(false);
            }
        }

        void fetchAuthentication();
    }, [])

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
