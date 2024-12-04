import React from "react";
import FormComponent from "../javascript/components/FormComponent.jsx";
import "../css/homepage.css"

const HomePage = () => {
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