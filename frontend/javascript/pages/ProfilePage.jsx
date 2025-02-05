import React, {useState, useEffect} from 'react';
import '../../css/profilepage.css';
import {sendApiRequest} from "../ApiRequest.jsx";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [messageDelete, setMessageDelete] = useState(null);
    const [errorDelete, setErrorDelete] = useState(null);
    const [error, setError] = useState(null);
    const [userAuth, setUserAuth] = useState({
        authenticated: null,
        is_staff: null
    });
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {

        const fetchUserProfile = async () => {
            try {

                const authData = await sendApiRequest(
                        'http://127.0.0.1:8000/api/auth',
                        'GET',
                        null,
                        false);

                setUserAuth({
                    authenticated: authData.authenticated,
                    is_staff: authData.is_staff
                });

                const data = await sendApiRequest('http://127.0.0.1:8000/api/user/', 'GET');
                setUserData(data);
            } catch (err) {
                setError('Failed to load user profile');
                console.error('Error loading user profile:', err);
            }
        };

        void fetchUserProfile();
    }, [])

    const handleFeedbacks = async () => {
        setLoading(true);

        try {
            const data = await sendApiRequest(
                        'http://127.0.0.1:8000/api/user/feedback', 'GET');

            setFeedbacks(data);

        } catch (err) {
            console.log(err)
        }

        setLoading(false);
    }

    useEffect(() => {
        void handleFeedbacks();
    }, [])

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
            setErrorDelete(err.message);
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
            setErrorChange(err.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main>
                <div className="nav-break"></div>
                <p className="main-text">Profile Page</p>

                <div className="profile-container">
                    {!userAuth.is_staff && (
                        <>
                            <h3>First Name: {userData.first_name}</h3>
                            <h3>Last Name: {userData.last_name}</h3>
                        </>
                    )}
                    <h3>Username: {userData.username}</h3>
                    <h3>E-mail: {userData.email}</h3>
                    <div className="update-password-container">
                        <h3>Update Password</h3>
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
                    <h3>
                        <button onClick={handleDelete} className="delete-button">
                            Delete My Account
                        </button>

                        {messageDelete && <p className="success-message">{messageDelete}</p>}
                        {errorDelete && <p className="error-message">{errorDelete}</p>}
                    </h3>
                </div>
            </main>

            {userAuth.is_staff && (
                <main>
                    <div className="nav-break"></div>
                    <p className="main-text">User Feedbacks</p>

                    <div className="table-container">
                        <table className="feedback-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Message</th>
                            </tr>
                            </thead>

                            <tbody>
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback) => (
                                    <tr key={feedback.id}>
                                        <td>{feedback.id}</td>
                                        <td>{feedback.name}</td>
                                        <td>{feedback.message}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No feedbacks available</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    <button onClick={handleFeedbacks} disabled={loading}>
                        {loading ? "Refreshing..." :
                            <img className="refresh-img" src="../../images/arrows-rotate-solid.svg" alt="refresh"/>}
                    </button>
                </main>
            )}
        </>
    );
};

export default ProfilePage;