import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input
} from "@nextui-org/react";
import {useState} from "react";
import {notify} from "@/hooks/notify";
import {useColorsStore} from "@/store/ColorsStore.js";
import PropTypes from 'prop-types';
ModalUpdateColor.propTypes = {
    colorProp: PropTypes.object.isRequired
}
export default function ModalUpdateColor({colorProp}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {updateColorApi, getColorsApi} = useColorsStore();
    const [color, setColor] = useState(colorProp);
    const onHandleSave = async (e) => {
        e.preventDefault();
        if (!color.animalColor || !color.animalHex) {
            notify("Completa todos los campos", "error");
            return;
        }
        await updateColorApi(color).then(() => {
            getColorsApi();
            onOpenChange();
        });
    }
    return (
        <>

            <Button onPress={onOpen} className="text-tiny text-black" variant="flat" color="success" radius="lg"
                        size="sm">
                    Modificar
            </Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modificar color</ModalHeader>
                            <ModalBody className="flex gap-3">
                                <Input type="text" variant="flat" label="Nombre de color" onChange={(e) => {
                                    setColor({
                                        ...color,
                                        animalColor: e.target.value
                                    })
                                }}
                                value={color.animalColor}
                                />
                                <div className="flex gap-3 items-center">
                                    <p>Coloca el color: </p>
                                    <input type="color" label="Nombre de color" onChange={(e) => {
                                        setColor({
                                            ...color,
                                            animalHex: e.target.value
                                        })
                                    }}
                                    value={color.animalHex}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="success" onClick={onHandleSave}>
                                    Actualizar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}