import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/index.css'
import NavbarComponent from "./NavbarComponent.jsx";
import FormComponent from "./FormComponent.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NavbarComponent />
        <main>
            <div className="nav-break"></div>
            <p className="main-text">Kickstart Your Trading Journey or Elevate Your Skills!</p>
            <FormComponent />
        </main>
    </StrictMode>,
)