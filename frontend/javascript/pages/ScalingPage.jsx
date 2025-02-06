import React, {useState} from "react";
import ServiceCardComponent from "../components/ServiceCardComponent.jsx";
import "../../css/scaling.css"
import {sendApiRequest} from "../ApiRequest.jsx";

const ScalingPage = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [error, setError] = useState([]);

    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('message', data.message);

        try {
            const response = await sendApiRequest(
                "http://127.0.0.1:8000/api/user/feedback",
                'POST',
                formData,
                true
            );

            setData({
                name: "",
                email: "",
                message: ""
            });

            if (response.status >= 200 && response.status < 300) {
                setSuccessMessage("Thank you for your feedback! We will get back to you soon.");
                console.log(response.message);
            } else {
                setError(response.message);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setData({
                name: "",
                email: "",
                message: ""
            });
        }
    };

    return (
        <>
            <main>
                <div className="nav-break"></div>

                <p className="main-text">Our Services</p>

                <ServiceCardComponent/>

                <div className="nav-break"></div>

                <p className="main-text">Not satisfied?</p>
                <p className="main-text">Contact us for tailored services for your needs!</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="main-text-thin" >Name</label>
                        <input type="text"
                               name="name"
                               value={data.name}
                               onChange={handleChange}
                               maxLength={100}
                               className="form-control"
                               placeholder="Your Name"
                               required
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="main-text-thin">Email</label>
                        <input type="email"
                               name="email"
                               value={data.email}
                               onChange={handleChange}
                               className="form-control"
                               placeholder="name@example.com"
                               required
                        />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="message" className="main-text-thin">Message</label>
                        <textarea className="form-control"
                                  name="message"
                                  value={data.message}
                                  onChange={handleChange}
                                  rows="4"
                                  placeholder="Your message..."
                                  required>

                        </textarea>

                    </div>

                    {error && <p style={{color: "red"}}>{error}</p>}
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
            </main>
        </>
    )
}

export default ScalingPage;