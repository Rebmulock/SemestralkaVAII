import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username,
                password,
            });
            const {refresh, access} = response.data;
            console.log(response.data);
            localStorage.setItem("username", username);
            localStorage.setItem("refresh", refresh);
            localStorage.setItem("access", access);
            setError("");
        } catch (err) {
            console.log(err);
            setError("Invalid credentials");
        }

        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        console.log(localStorage.getItem("refresh"));
        window.location.reload();
    }

    const handleDelete = () => {
        navigate("/delete")
    }

    const handlePassword = () => {
        navigate("/change-password")
    }

    return (
        <div>
            {localStorage.getItem('refresh') !== null ? (
                <div className="menu-option">
                    <b>{localStorage.getItem("username")}</b>
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleDelete}>Delete Acc</button>
                    <button onClick={handlePassword}>Change Password</button>
                </div>
            ) : (
                <form className="menu-option" onSubmit={handleLogin}>
                    <div>
                        <label>Username</label>
                        <label>Password</label>
                    </div>

                    <div>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p style={{color: "red"}}>{error}</p>}
                    <button type="submit">Login</button>
                </form>
                )
            }
        </div>
    )
};

export default LoginComponent;
