import React from 'react';
import {useNavigate} from "react-router-dom";
import "../../css/navbar.css";

const NavbarComponent = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <a onClick={(e) => {
                e.preventDefault();
                navigate("/");
            }}>
                <img className="nav-logo" src="../../images/logo-white.svg" alt="logo"/>
            </a>
        </nav>
    )
}

export default NavbarComponent;