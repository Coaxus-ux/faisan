import { useEffect } from "react";
import { useColorsStore } from "@/store/ColorsStore.js";
import ColorSwatch from "@/components/ColorSwatch.jsx";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import ModalColor from "@/components/ModalColor.jsx";
import HeaderWithBreadcrumbs from "@/components/HeaderWithBreadcrumbs.jsx";

export default function Colors() {
  const { getColorsApi, getColors } = useColorsStore();
  const navigate = useNavigate();
  useEffect(() => {
    getColorsApi();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="m-10">
         <HeaderWithBreadcrumbs
                breadcrumbTitle="Colores"
                pageTitle="Gestión de Colores"
            />
      <div className="flex flex-wrap gap-3 px-3">
        <ModalColor />
        {getColors().map((color) => (
          <ColorSwatch color={color} key={color.id} />
        ))}
      </div>
    </div>
  );
}
