import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import BlueprintPage from "../pages/BlueprintPage.jsx";
import ScalingPage from "../pages/ScalingPage.jsx";
import UserControlComponent from "./components/UserControlComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

const App = () => {
    return (
        <Router>
            <NavbarComponent/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blueprint" element={<BlueprintPage />} />
                <Route path="/scaling" element={<ScalingPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound /> } />
            </Routes>
            <UserControlComponent />
        </Router>
    )
}

export default App;