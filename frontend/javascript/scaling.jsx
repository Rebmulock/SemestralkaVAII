import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/navbar.css'
import NavbarComponent from "./components/NavbarComponent.jsx";
import ServiceCardComponent from "./components/ServiceCardComponent.jsx";
import UserControlComponent from "./components/UserControlComponent.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NavbarComponent/>

        <main>
            <div className="nav-break"></div>

            <p className="main-text">Our Services</p>

            <ServiceCardComponent/>

            <div className="nav-break"></div>

            <p className="main-text">Not satisfied?</p>
            <p className="main-text">Contact us for tailored services for your needs!</p>

            <form className="contact-form">
                <div className="mb-3">
                    <label htmlFor="name" className="main-text-thin">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your Name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="main-text-thin">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="main-text-thin">Message</label>
                    <textarea className="form-control" id="message" rows="4" placeholder="Your message..."
                              required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
        </main>

        <UserControlComponent/>
    </StrictMode>,
)