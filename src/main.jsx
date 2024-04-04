import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import {Toaster} from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <NextUIProvider>
            <App/>
        </NextUIProvider>
        <Toaster/>
    </React.StrictMode>,
)
