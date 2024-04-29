import React from "react";
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Chip, Pagination
} from "@nextui-org/react";
import {FaEye} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import {format, differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears} from 'date-fns';
import {es} from 'date-fns/locale/es';
import PropTypes from 'prop-types';

MasterTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
};
export default function MasterTable({columns, data}) {
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 5;
    const pages = Math.ceil(data.length / rowsPerPage);

    const dataSorted = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);
    const dateNow = new Date();
    const renderCell = React.useCallback((animal, columnKey) => {
        const months = differenceInCalendarMonths(dateNow, new Date(animal.animalBirthDate)) % 12
        const days = differenceInCalendarDays(dateNow, new Date(animal.animalBirthDate)) % 30 - 1
        const years = differenceInCalendarYears(dateNow, new Date(animal.animalBirthDate))
        switch (columnKey) {
            case "animal_number":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold capitalize">{animal.animalFarmNumber}</p>
                    </div>
                );
            case "animalFEDGAN":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold capitalize">{animal.animalFEDGAN}</p>
                    </div>
                );
            case "animalColor":
                return (
                    <Chip color="primary" variant="light">{animal.animalColor.animalColor}</Chip>
                );
            case "animal_sex":
                return (

                    <p className="text-bold capitalize">{animal.animalSex}</p>

                );
            case "birth_date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold capitalize">{format(new Date(animal.animalBirthDate), 'dd MMM yyyy', {locale: es})}</p>
                        <div className="flex gap-1">
                            {years === 0 && months === 0 ? <p className="text-blue-200 text-xs">{days} Dias </p> : null}
                            {years === 0 && months !== 0 ? <><p className="text-blue-200 text-xs">{months} Meses </p>
                                <p className="text-blue-200 text-xs">{days} Dias </p></> : null}
                            {years !== 0 ? <> <p className="text-blue-200 text-xs">{years} Años </p> <p
                                className="text-blue-200 text-xs">{months} Meses </p>
                                <p className="text-blue-200 text-xs">{days} Dias </p>  </> : null}


                        </div>
                    </div>
                );
            case "animal_birth_type":
                return (
                    <>
                        {animal.fertilisationType.typeFertilisation === "Inseminación" ?
                            <Chip color="warning" variant="flat">{animal.fertilisationType.typeFertilisation}</Chip>
                            :
                            <Chip color="success" variant="flat">{animal.fertilisationType.typeFertilisation}</Chip>
                        }

                    </>
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
    return (<Table

        aria-label="Master Table"
        className="mb-3"
        bottomContent={
            <div className="flex w-full justify-center">
                {pages > 1 &&
                    <Pagination
                        showControls
                        showShadow
                        color="default"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                }
            </div>

        }
    >
        <TableHeader columns={columns}>
            {(column) => (<TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
            </TableColumn>)}
        </TableHeader>
        <TableBody items={dataSorted}>
            {(item) => (<TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>)}
        </TableBody>
    </Table>)
}