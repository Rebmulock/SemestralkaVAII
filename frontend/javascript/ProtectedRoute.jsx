import { Navigate, Outlet } from "react-router-dom";
import {useEffect, useState} from "react";
import {sendApiRequest} from "./ApiRequest.jsx";
import PropTypes from "prop-types";

const ProtectedRoute = ({adminOnly}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isStaff, setIsStaff] = useState(null);

    useEffect(() => {
        const fetchAuthentication = async () => {
            try {
                const authData = await sendApiRequest(
                            'http://127.0.0.1:8000/api/auth',
                            'GET',
                            null,
                            false);

                setIsAuthenticated(authData.data.authenticated);
                setIsStaff(authData.data.is_staff);
            } catch (err) {
                console.error('Error fetching authorisation:', err);
                setIsAuthenticated(false);
                setIsStaff(false);
            }
        }

        void fetchAuthentication();
    }, [])

    if (isAuthenticated === null || isStaff === null) {
        return <div>Loading...</div>;
    }

    return (!isAuthenticated || (adminOnly && !isStaff)) ? <Navigate to="/" replace /> : <Outlet />;
};

ProtectedRoute.propTypes = {
    adminOnly: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
