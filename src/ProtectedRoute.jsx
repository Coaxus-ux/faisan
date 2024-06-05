import {useLoginStore} from "./store/LoginStore.js";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
export default function ProtectedRoute() {
    const {getIsLogged} = useLoginStore();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(getIsLogged);
        if (!getIsLogged()) {
            navigate("/auth/login");
        }
    }, [navigate]);
    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className="lg:ml-64 mt-20 lg:mt-0">
                <Outlet/>
            </div>
        </>
    );
}