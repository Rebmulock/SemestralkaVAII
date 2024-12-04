import React from "react";
import NavbarComponent from "../javascript/components/NavbarComponent.jsx";
import FormComponent from "../javascript/components/FormComponent.jsx";
import UserControlComponent from "../javascript/components/UserControlComponent.jsx";
import "../css/homepage.css"

const HomePage = ({ isAuthenticated }) => {
    return (
        <>
            <main>
                <div className="nav-break"></div>
                <p className="main-text">Kickstart Your Trading Journey or Elevate Your Skills!</p>
                <FormComponent />
            </main>
        </>
    )
}

export default HomePage;