import { useEffect } from "react";
import { useColorsStore } from "@/store/ColorsStore.js";
import ColorSwatch from "@/components/ColorSwatch.jsx";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
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
          <BreadcrumbItem
            onClick={() => {
              navigate("/tools");
            }}
            underline
          >
            Inicio
          </BreadcrumbItem>
          <BreadcrumbItem>Colores</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex justify-between py-3">
        <h1 className="text-2xl font-bold">Colores</h1>
        <Button
          auto
          size="small"
          color="danger"
          onClick={() => navigate("/tools")}
        >
          {" "}
          Volver{" "}
        </Button>
      </div>
      <div className="flex flex-wrap gap-3 px-3">
        <ModalColor />
        {getColors().map((color) => (
          <ColorSwatch color={color} key={color.id} />
        ))}
      </div>
    </div>
  );
}
