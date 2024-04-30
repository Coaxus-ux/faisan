import { useEffect } from "react";
import { useColorsStore } from "@/store/ColorsStore.js";
import ColorSwatch from "@/components/ColorSwatch.jsx";
import { useNavigate} from "react-router-dom";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import ModalColor from "@/components/ModalColor.jsx";

export default function Colors() {
    const { getColorsApi, getColors } = useColorsStore();
    const navigate = useNavigate();
    useEffect(() => {
        getColorsApi();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="m-10">
            <div className="flex mb-10">
                <Breadcrumbs>
                    <BreadcrumbItem onClick={()=>{ navigate("/tools")}} underline>Inicio</BreadcrumbItem>
                    <BreadcrumbItem>Colores</BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div className="flex flex-wrap gap-3">
                <ModalColor/>
                {getColors().map((color) => <ColorSwatch color={color} key={color.id}/>)}
            </div>
        </div>
    )
}