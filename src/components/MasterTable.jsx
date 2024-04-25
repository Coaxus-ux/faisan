import React from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue
} from "@nextui-org/react";
import {FaEye} from "react-icons/fa";
import {MdEdit} from "react-icons/md";

const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};
export default function MasterTable({columns, data}) {
    const renderCell = React.useCallback((animal, columnKey) => {
        switch (columnKey) {
            case "animal_number":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{animal.animalFarmNumber}</p>
                    </div>
                );
            case "birth_date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{animal.animalBirthDate}</p>
                    </div>
                );
            case "animal_birth_type":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{animal.fertilisationType.typeFertilisation}</p>
                    </div>
                );
            case "animal_sex":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{animal.animalSex}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <FaEye/>
                          </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <MdEdit/>
                          </span>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    }, []);
    return (<Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
            {(column) => (<TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
            </TableColumn>)}
        </TableHeader>
        <TableBody items={data}>
            {(item) => (<TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>)}
        </TableBody>
    </Table>)
}