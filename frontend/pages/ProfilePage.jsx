import React, {useState} from 'react';
import '../css/homepage.css';
import {sendApiRequest} from "../javascript/ApiRequest.jsx";

const ProfilePage = () => {
    const [messageDelete, setMessageDelete] = useState(null);
    const [errorDelete, setErrorDelete] = useState(null);

    const handleDelete = async () => {
        setMessageDelete(null);
        setErrorDelete(null);

        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!confirmed) return;

        try {
            await sendApiRequest(
                'http://127.0.0.1:8000/api/delete-user/',
                'DELETE'
            );

            setMessageDelete("Your account has been deleted successfully.");
            localStorage.clear();
            window.location.href = '/';

        } catch (err) {
            setErrorDelete("An error occurred while deleting your account.");
        }
    };

     const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [messageChange, setMessageChange] = useState(null);
    const [errorChange, setErrorChange] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorChange(null);
        setMessageChange(null);

        if (formData.newPassword !== formData.confirmPassword) {
            setErrorChange("New passwords do not match.");
            return;
        }

        try {
            const response = await sendApiRequest(
                'http://127.0.0.1:8000/api/update-password/',
                'PUT',
                {
                    old_password: formData.oldPassword,
                    new_password: formData.newPassword,
                    confirm_password: formData.confirmPassword,
                }
            );

            if (response) {
                setMessageChange("Password updated successfully!");
                setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (err) {
            setErrorChange("An error occurred while updating the password.");
        }
    };

    return (
        <main>
            <div className="nav-break"></div>
            <p className="main-text">Profile Page</p>

            <div className="delete-user-container">
                <h2>Delete Account</h2>
                <p>Warning: Deleting your account is permanent and cannot be undone.</p>
                <button onClick={handleDelete} className="delete-button">
                    Delete My Account
                </button>
                {messageDelete && <p className="success-message">{messageDelete}</p>}
                {errorDelete && <p className="error-message">{errorDelete}</p>}
            </div>

            <div className="update-password-container">
                <h2>Update Password</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="oldPassword">Old Password:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update Password</button>
                </form>
                {messageChange && <p className="success-message">{messageChange}</p>}
                {errorChange && <p className="error-message">{errorChange}</p>}
            </div>
        </main>
    );
};

export default ProfilePage;