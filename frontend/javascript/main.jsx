import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/index.css'
import FormComponent from "./FormComponent.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <FormComponent />
    </StrictMode>,
)
