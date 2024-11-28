import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/navbar.css'
import '../css/index.css'
import NavbarComponent from "./components/NavbarComponent.jsx";
import FormComponent from "./components/FormComponent.jsx";
import UserControlComponent from "./components/UserControlComponent.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NavbarComponent />
        <main>
            <div className="nav-break"></div>
            <p className="main-text">Kickstart Your Trading Journey or Elevate Your Skills!</p>
            <FormComponent />
        </main>

        <UserControlComponent />
    </StrictMode>,
)