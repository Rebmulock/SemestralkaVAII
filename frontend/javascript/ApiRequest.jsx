import axios from 'axios';

export const sendApiRequest = async (url, method = "GET", data = null, noAuth = false) => {
    try {
        let response = null;

        if (!noAuth) {
            const refreshToken = localStorage.getItem("refresh");

            if (!refreshToken) {
                console.error("No refresh token found. Please log in.");
                return;
            }

            const accessToken = (await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: refreshToken,
            })).data.access;

            const authHeaders = {
                Authorization: `Bearer ${accessToken}`,
            };

            response = await axios({
            url: url,
            method: method,
            data: data,
            headers: authHeaders,
            });

        } else {
            response = await axios({
            url: url,
            method: method,
            data: data,
            });
        }

        return response.data;

    } catch (error) {
        if (error.response) {
            console.error("Error status:", error.response.status);
            console.error("Error data:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
};
