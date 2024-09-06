import {Button} from "@nextui-org/react";
import {MdOutlineEdit} from "react-icons/md";
import PropTypes from "prop-types";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {useFertilisationStore} from "@/store/FertilisationStore";
import {GoDotFill} from "react-icons/go";
import {notify} from "@/hooks/notify.jsx";
import classNames from 'classnames';

export default function FertilisationList({fertilisations}) {
    const {setFertilisationToUpdate, updateFertilisation, getAllFertilisation} = useFertilisationStore();

    const handleUpdate = (fertilisation) => {
        setFertilisationToUpdate(fertilisation);
    };
    const handleDisable = (fertilisation) => {
        fertilisation.typeFertilisationStatus = !fertilisation.typeFertilisationStatus;
        updateFertilisation(fertilisation).then(() => {
            notify(fertilisation.typeFertilisationStatus ? "Habilitado" : "Deshabilitado", "success");
            getAllFertilisation();
        });
    }
    return (
        <div className="p-2 mt-2 max-h-[320px] overflow-hidden">
            <div className="flex justify-between pb-2 text-gray-400 border-b text-sm">
                <p>Tipo de Fertilización</p>
                <p className="mr-5">Acciones</p>
            </div>

            <ScrollShadow className="overflow-y-auto max-h-[320px] mt-2">
                {fertilisations.map((fertilisation) => (
                    <div
                        className="flex justify-between border-b p-3 items-center"
                        key={fertilisation.id}
                    >
                        <p>
                            {fertilisation.typeFertilisation}
                            {
                                !fertilisation.typeFertilisationStatus &&
                                <span
                                    className={classNames("text-xs", "bg-red-100", "text-red-700", "rounded-full", "px-2", "py-1", "ml-2")}>
                                    Deshabilitado
                                </span>
                            }

                        </p>

                        <div className="flex gap-2">
                            <Button
                                isIconOnly
                                variant="light"
                                color="primary"
                                aria-label={`Editar ${fertilisation.typeFertilisation}`}
                                onClick={() => handleUpdate(fertilisation)}
                            >
                                <MdOutlineEdit/>
                            </Button>
                            <Button
                                isIconOnly
                                variant="light"
                                color="success"
                                aria-label={`Editar ${fertilisation.typeFertilisation}`}
                                onClick={() => handleDisable(fertilisation)}
                            >
                                <GoDotFill/>
                            </Button>
                        </div>
                    </div>
                ))}
            </ScrollShadow>
        </div>
    );
}

FertilisationList.propTypes = {
    fertilisations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            typeFertilisation: PropTypes.string.isRequired,
        })
    ).isRequired,
};
