import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import BlueprintPage from "../pages/BlueprintPage.jsx";
import ScalingPage from "../pages/ScalingPage.jsx";
import UserControlComponent from "./components/UserControlComponent.jsx";
import NavbarComponent from "./components/NavbarComponent.jsx";
import NotFound from "../pages/NotFound.jsx";
import DeleteUser from "../pages/DeleteUser.jsx";
import UpdatePassword from "../pages/UpdatePassword.jsx";

const App = () => {
    return (
        <Router>
            <NavbarComponent/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blueprint" element={<BlueprintPage />} />
                <Route path="/scaling" element={<ScalingPage />} />
                <Route path="/delete" element={<DeleteUser />} />
                <Route path="/change-password" element={<UpdatePassword />} />
                <Route path="*" element={<NotFound /> } />
            </Routes>
            <UserControlComponent />
        </Router>
    )
}

export default App;