import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import BlueprintPage from "../pages/BlueprintPage.jsx";
import ScalingPage from "../pages/ScalingPage.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blueprint" element={<BlueprintPage />} />
                <Route path="/scaling" element={<ScalingPage />} />
            </Routes>
        </Router>
    )
}

export default App;