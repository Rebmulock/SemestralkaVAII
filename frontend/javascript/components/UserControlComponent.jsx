import React, { useState } from "react";
import '../../css/usercontrol.css'
import LoginComponent from "./LoginComponent.jsx";
import RegisterComponent from "./RegisterComponent.jsx";

const UserControlComponent = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [haveAccount, setHaveAccount] = useState(true);

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
                { haveAccount ?
                    <LoginComponent className="menu-option" setHaveAccount={setHaveAccount}/> :
                    <RegisterComponent className="menu-option" setHaveAccount={setHaveAccount}/>}
            </div>
            <a className="user-control-button" onMouseDown={handleMouseDown}
               onMouseUp={handleMouseUp}
               style={{transform: isPressed ? 'scale(0.9)' : 'scale(1.0)',}}
               onClick={toggleMenu}>
                <img className="user-img" src="../../images/user-solid.svg" alt="user icon"/>
            </a>
        </div>


    )
}

export default UserControlComponent;