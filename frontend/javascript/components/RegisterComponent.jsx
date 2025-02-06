import React, { useState } from 'react';
import { sendApiRequest } from '../ApiRequest.jsx';
import PropTypes from 'prop-types';
import {validateLettersOnly, validateUsername} from "../InputValidator.jsx";

const Register = ({setHaveAccount}) => {
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
    const [usernameError, setUsernameError] = useState(null);
    const [nameError, setNameError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNameError(null);
        setUsernameError(null);

        if (name === "first_name" || name === "last_name") {
            if (!validateLettersOnly(value)) {
                setNameError("Please enter valid name only!")
            }
        }

        if (name === "username") {
            if (!validateUsername(value)) {
                setUsernameError("Please use only [a-z, A-Z, 0-9, ., _]")
            }
        }

        setFormData({
            ...formData,
            [name]: value,
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

        if (usernameError || nameError) {
            setError("Please fix the errors before submitting.");
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

            if (response.status >= 200 && response.status < 300) {
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
            } else {
                const {username, email} = response.data;

                if (username) {
                    setError(username[0]);
                } else if (email) {
                    setError(email[0]);
                } else {
                    setError(response.message);
                }
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <form className="menu-option" onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <div className="menu-option-group">
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
                <div className="menu-option-group">
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
                {nameError && <p className="error-message">{nameError}</p>}
                <div className="menu-option-group">
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
                <div className="menu-option-group">
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
                {usernameError && <p className="error-message">{usernameError}</p>}
                <div className="menu-option-group">
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
                <div className="menu-option-group">
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
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <button type="submit">Register</button>
                Already have an account?
                <a className="login-register-switch" onClick={(e) => {
                e.preventDefault();
                setHaveAccount(true);
                }}>
                    Sign in here
                </a>
            </form>
        </div>

    );
};

Register.propTypes = {
    setHaveAccount: PropTypes.func.isRequired,
};

export default Register;
