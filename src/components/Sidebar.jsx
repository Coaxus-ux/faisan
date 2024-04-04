import {RxDashboard} from "react-icons/rx";
import {GiCow, GiBullHorns} from "react-icons/gi";
import {NavLink} from 'react-router-dom';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User} from "@nextui-org/react";
import {HiDotsHorizontal} from "react-icons/hi";
import {useEffect} from "react";
import {useResponsive} from "@/store/ResponseStore.js";

export default function Sidebar() {
    const {getState, isOpen} = useResponsive();
    const routes = [{
        path: "/dashboard", name: "General", icon: <RxDashboard size="12"/>,
    }, {
        path: "/females", name: "Hembras", icon: <GiCow size="12"/>,
    }, {
        path: "/males", name: "Machos", icon: <GiBullHorns size="12"/>,
    }]
    useEffect(() => {
        if (getState()) {
            document.getElementById('sidebar').classList.remove('hidden');

        } else {
            document.getElementById('sidebar').classList.add('hidden');
        }
    }, [isOpen, getState]);
    return (<>
        <aside id="sidebar"
               className="flex fixed top-0 left-0 flex-col flex-shrink-0 w-64 h-full duration-200 transition-width z-40 lg:flex"
               aria-label="Sidebar">
            <div className="flex relative flex-col flex-1 pt-16 min-h-0">
                <div className="flex overflow-y-auto flex-col flex-1 pb-4">
                    <div className="flex-1 px-3 bg-gray-50" id="sidebar-items">
                        <ul className="pb-2 pt-1">
                            {routes.map((route, index) => (<li key={index}>
                                <NavLink
                                    to={route.path}
                                    className={({isActive}) => (isActive ? 'is-active' : 'not-active')}
                                >
                                    <div>
                                        {route.icon}
                                    </div>
                                    <span className="ml-3 text-dark-500 text-sm font-medium"
                                    >{route.name}</span>
                                </NavLink>
                            </li>))}
                        </ul>
                        <hr className="border-0 h-px bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100"/>
                        <div className="pt-2">

                            {/*TODO: Add more items here*/}
                        </div>
                    </div>
                </div>
                <div
                    className="bottom-0 left-0 p-4 space-x-4 w-full flex bg-gray-100 items-center"
                >
                    <User
                        name="Ricardo Azuero"
                        description="Dueño de la finca"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}

                    />
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="ghost">
                                <HiDotsHorizontal/>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new">Configuración</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger">
                                Salir
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </aside>
    </>);
}