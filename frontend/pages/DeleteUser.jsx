import React, { useState } from 'react';
import { sendApiRequest } from '../javascript/ApiRequest.jsx';

const DeleteUser = () => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setMessage(null);
        setError(null);

        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!confirmed) return;

        try {
            const response = await sendApiRequest(
                'http://127.0.0.1:8000/api/delete-user/',
                'DELETE'
            );

            setMessage("Your account has been deleted successfully.");
            localStorage.clear();
            window.location.href = '/';

        } catch (err) {
            setError("An error occurred while deleting your account.");
        }
    };

    return (
        <div className="delete-user-container">
            <h2>Delete Account</h2>
            <p>Warning: Deleting your account is permanent and cannot be undone.</p>
            <button onClick={handleDelete} className="delete-button">
                Delete My Account
            </button>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default DeleteUser;
