import {
    Button, DateInput,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Textarea,
    useDisclosure
} from "@nextui-org/react";
import {useWeightStore} from "@/store/weightStore";
import {parseDate} from "@internationalized/date";
import {useState} from "react";
import Props from "prop-types";
import {notify} from "@/hooks/notify.jsx";
import {useParams} from "react-router-dom";
import {padTo2Digits} from "@/utils/padTo2Digits.js";

EditWeightModal.propTypes = {
    weight: Props.object.isRequired
}

export default function EditWeightModal({weight}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [weight2Update, setWeight2Update] = useState(weight);
    const {updateWeightAPI, getWeightAPI} = useWeightStore();
    const {animalId} = useParams();

    const onHandleChange = (e) => {
        if (!Object.prototype.hasOwnProperty.call(e, "target")) {
            setWeight2Update({
                ...weight2Update,
                dateWeight: `${e.year}-${padTo2Digits(e.month)}-${padTo2Digits(e.day)}T00:00:00.000Z`
            });
            return;
        }
        setWeight2Update({
            ...weight2Update, [e.target.name]: e.target.value
        });
    };

    const onUpdate = () => {
        updateWeightAPI(animalId, weight2Update.weightAnimal, weight2Update.dateWeight, weight2Update.weighingDescription, weight2Update.id)
            .then(() => {
                notify("Registro actualizado", "success");
                getWeightAPI(animalId);
            })
            .finally(() => {
                onClose();
            });
    }

    return (
        <>
            <Button onPress={onOpen} className="text-tiny text-black w-full" variant="flat" color="secondary">
                Editar
            </Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onClose}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Editar peso</ModalHeader>
                    <ModalBody className="flex gap-3">
                        <div className="flex gap-3">
                            <Input isRequired type="number" variant="flat" label="Peso en KG" name="weightAnimal"
                                   value={weight2Update.weightAnimal}
                                   onChange={onHandleChange}/>
                            <DateInput
                                onChange={onHandleChange}
                                isRequired
                                label="Fecha de pesaje"
                                name="dateWeight"
                                granularity="day"
                                defaultValue={parseDate(weight2Update.dateWeight.split('T')[0])}
                            />
                        </div>
                        <Textarea
                            isRequired
                            onChange={onHandleChange}
                            label="Descripción"
                            placeholder="Alguna descripción del animal o dato relevante"
                            className="w-full"
                            name="weighingDescription"
                            value={weight2Update.weighingDescription}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="error" auto onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button color="success" auto onClick={onUpdate}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}