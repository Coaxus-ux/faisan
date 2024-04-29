import {RouterProvider} from "react-router-dom";
import router from "./routes.jsx";
import {Suspense} from "react";
import Loader from "@/components/Loader.jsx";

export default function App() {
    return (
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={router}/>
        </Suspense>
    );
}