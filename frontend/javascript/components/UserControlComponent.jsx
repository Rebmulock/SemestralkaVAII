import React, { useState } from "react";
import '../../css/usercontrol.css'
import LoginComponent from "./LoginComponent.jsx";

const UserControlComponent = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <div className="user-control">
            <div className={`user-control-menu ${openMenu ? 'open' : ''}`}>
                <LoginComponent className="menu-option menu-option-lower" />
            </div>
            <a onMouseDown={handleMouseDown}
               onMouseUp={handleMouseUp}
               style={{transform: isPressed ? 'scale(0.9)' : 'scale(1.0)',}}
               onClick={toggleMenu}>
                <img className="user-img" src="../../images/user-solid.svg" alt="user icon"/>
            </a>
        </div>


    )
}

export default UserControlComponent;