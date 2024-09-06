import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import {useFertilisationStore} from "@/store/FertilisationStore";
import {notify} from "@/hooks/notify.jsx";
import {useEffect, useState} from "react";

FertilisationManager.propTypes = {
    isUpdate: PropTypes.bool || false,
    fertilisation: PropTypes.object || null,
};
const templateFertilisation = {
    typeFertilisation: "",
    id: "",
    typeFertilisationStatus: true,
};
export default function FertilisationManager() {

    const {
        addFertilisation,
        getFertilisationToUpdate,
        getAllFertilisation,
        updateFertilisation,
        setFertilisationToUpdate,
    } = useFertilisationStore();

    const [fertilisationState, setFertilisationState] = useState(templateFertilisation);
    const clearFertilisationState = () => {
        setFertilisationState(templateFertilisation);
    }

    useEffect(() => {
        clearFertilisationState();
        if (getFertilisationToUpdate()) {
            setFertilisationState(getFertilisationToUpdate());
        }
    }, [getFertilisationToUpdate()]);
    const onHandleAdd = () => {
        addFertilisation(fertilisationState.typeFertilisation).then(() => {
            setFertilisationState("");
            notify("Fertilización agregada", "success");
            getAllFertilisation();
        });
    };
    const onHandleUpdate = () => {
        updateFertilisation(fertilisationState).then(() => {
            clearFertilisationState();
            notify("Fertilización actualizada", "success");
            getAllFertilisation();
        });
    };
    const isUpdate = () => {
        return !!getFertilisationToUpdate();
    }
    const isReadyToClick = () => {
        return !fertilisationState.typeFertilisation.trim().length > 0;
    }
    const onHandleSubmit = () => {
        if (isUpdate()) {
            onHandleUpdate();
        } else {
            onHandleAdd();
        }
    };

    return (
        <div className="flex items-center gap-3">
            <Input
                className="w-full"
                placeholder={"Ingrese un nuevo tipo"} value={fertilisationState.typeFertilisation}
                onChange={
                    (e) => setFertilisationState({...fertilisationState, typeFertilisation: e.target.value})
                }
                isClearable={
                    isUpdate()
                }
                onClear={() => {
                    clearFertilisationState();
                    setFertilisationToUpdate(null);
                }}
            />
            <Button color="success" onPress={onHandleSubmit} isDisabled={isReadyToClick()} >
                {
                    isUpdate() ? "Actualizar" : "Agregar"
                }
            </Button>
        </div>
    );
}
