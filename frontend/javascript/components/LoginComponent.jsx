import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username,
                password,
            });
            const {access} = response.data;
            localStorage.setItem("token", access);
            console.log(localStorage.getItem("token"));
            setUsername(username);
            setError("");
        } catch (err) {
            console.log(err);
            setError("Invalid credentials");
        }
    };

    return (
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
    );
};

export default Login;
