import { useEffect } from "react";
import { useFertilisationStore } from "@/store/FertilisationStore.js";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ModalAddFertilisation from "@/components/ModalAddFertilisation";
export default function Fertilisation() {
  const { getFertilisations, getAllFertilisation } = useFertilisationStore();
  useEffect(() => {
    getAllFertilisation();
    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();
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
          <BreadcrumbItem>Tipos de nacimientos</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex justify-between py-3">
        <h1 className="text-2xl font-bold">Colores</h1>
        <div className="space-x-2">
          <Button
            auto
            size="small"
            color="danger"
            onClick={() => navigate("/tools")}
          >
            Volver
          </Button>
          <ModalAddFertilisation />
        </div>
      </div>
      <div className="px-10">
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
      </div>
    </div>
  );
}
