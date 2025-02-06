import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {validateUsername} from "../InputValidator.jsx";

const LoginComponent = ({setHaveAccount}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setIsLoggedIn] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);

        if(!validateUsername(value)) {
            setError("Invalid username!")
        } else {
            setError("");
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (error) {
            setError("");
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (error) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username,
                password,
            });
            const {refresh, access} = response.data;
            localStorage.setItem("username", username);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("access", access);
            setIsLoggedIn(true);
            setError("");
            setUsername("");
            setPassword("");
        } catch (err) {
            console.log(err);
            setError("Invalid credentials");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        setIsLoggedIn(false);
        navigate("/")
    }

    const handleProfileRedirect = () => {
        navigate("/profile");
    }

    return (
        <div>
            {loggedIn ? (
                <div className="menu-option">
                    <div className="menu-option-logged">
                        <b>{localStorage.getItem("username")}</b>
                        <button onClick={handleProfileRedirect}>Profile</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            ) : (
                <form className="menu-option" onSubmit={handleLogin}>
                    <h2>
                        Sign in
                    </h2>

                    <div className="menu-option-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="menu-option-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>

                    {error && <p style={{color: "red"}}>{error}</p>}
                    <button type="submit">Login</button>

                    Don&apos;t have an account yet?
                    <a className="login-register-switch" onClick={(e) => {
                    e.preventDefault();
                    setHaveAccount();
                    }}>
                        Sign up here
                    </a>
                </form>
                )
            }
        </div>
    )
};

LoginComponent.propTypes = {
    setHaveAccount: PropTypes.func.isRequired,
};

export default LoginComponent;
