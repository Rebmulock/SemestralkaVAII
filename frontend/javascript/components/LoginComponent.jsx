import React, { useState } from "react";
import axios from "axios";

const LoginComponent = ({ isAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

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
            setUser(username)
            setError("");
        } catch (err) {
            console.log(err);
            setError("Invalid credentials");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("refresh");
        localStorage.removeItem("access");
        setUser(null);
        console.log(localStorage.getItem("refresh"));
    }

    return (
        <div>
            {isAuthenticated ? (
                <div className="menu-option">
                    <b>{localStorage.getItem("username")}</b>
                    <button onClick={handleLogout}>Logout</button>
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
