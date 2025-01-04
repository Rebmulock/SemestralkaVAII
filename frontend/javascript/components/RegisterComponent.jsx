import React, { useState } from 'react';
import { sendApiRequest } from '../ApiRequest.jsx';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await sendApiRequest(
                'http://127.0.0.1:8000/api/register/',
                'POST',
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
                },
                true
            );

            if (response) {
                setMessage("User registered successfully!");
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    }
                );
            }
        } catch (err) {
            setError("An error occurred during registration.");
        }
    };

    return (
        <div>
            {localStorage.getItem('refresh') !== null ? null : (
                <div className="menu-option">
                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="first_name">First Name:</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name:</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                    {message && <p className="success-message">{message}</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            )
            }
        </div>

    );
};

export default Register;
