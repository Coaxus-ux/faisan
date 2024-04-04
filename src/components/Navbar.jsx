import Logo from '@/assets/Logo.svg'
import {Button} from "@nextui-org/react";
import {HiMenuAlt2} from "react-icons/hi";
import {useResponsive} from "@/store/ResponseStore.js";
import {LiaTimesSolid} from "react-icons/lia";
import {useState} from "react";

export default function Navbar() {
    const {toggle, getState} = useResponsive();
    const handleMenu = () => {
        toggle();
    }
    useState(() => {

    });
    return (
        <div className="flex gap-2 my-4 px-4 pl-7 items-center font-bold text-2xl h-11 z-50 fixed top-0">
            <Button isIconOnly variant="light" color="primary" className="flex lg:hidden" onClick={handleMenu}>
                {getState() ? <LiaTimesSolid/> : <HiMenuAlt2/>}
            </Button>
            <img src={Logo} className="w-7" alt="logo"/>
            FINLANDIA
        </div>
    )
}