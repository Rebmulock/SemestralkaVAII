import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import BlueprintPage from "../pages/BlueprintPage.jsx";
import ScalingPage from "../pages/ScalingPage.jsx";
import UserControlComponent from "./components/UserControlComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const refreshToken = localStorage.getItem("refresh");
        const username = localStorage.getItem("username");

        if (refreshToken && username) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <Router>
            <NavbarComponent/>
            <Routes>
                <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
                <Route path="/blueprint" element={<BlueprintPage isAuthenticated={isAuthenticated} />} />
                <Route path="/scaling" element={<ScalingPage isAuthenticated={isAuthenticated} />} />
            </Routes>
            <UserControlComponent isAuthenticated={isAuthenticated} />
        </Router>
    )
}

export default App;