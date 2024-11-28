import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/navbar.css'
import NavbarComponent from "./components/NavbarComponent.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NavbarComponent />
    </StrictMode>,
)