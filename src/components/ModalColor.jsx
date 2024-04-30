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
import {CiCirclePlus} from "react-icons/ci";
import {useState} from "react";
import {notify} from "@/hooks/notify";
import {useColorsStore} from "@/store/ColorsStore.js";

export default function ModalColor() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {createColor, getColorsApi} = useColorsStore();
    const [color, setColor] = useState({
        name: "",
        hex: ""
    });
    const onHandleSave = async (e) => {
        e.preventDefault();
        if (!color.name || !color.hex) {
            notify("Completa todos los campos", "error");
            return;
        }
        await createColor(color).then(() => {
            getColorsApi();
            setColor({
                name: "",
                hex: ""
            })
        });
    }
    return (
        <>
            <Button onPress={onOpen} color="secondary" variant="flat" className="w-52 h-56"><CiCirclePlus
                size={56}/>Crear</Button>
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
                            <ModalHeader className="flex flex-col gap-1">Crear color</ModalHeader>
                            <ModalBody className="flex gap-3">
                                <Input type="text" variant="flat" label="Nombre de color" onChange={(e) => {
                                    setColor({
                                        ...color,
                                        name: e.target.value
                                    })
                                }}
                                value={color.name}
                                />
                                <div className="flex gap-3 items-center">
                                    <p>Coloca el color: </p>
                                    <input type="color" label="Nombre de color" onChange={(e) => {
                                        setColor({
                                            ...color,
                                            hex: e.target.value
                                        })
                                    }}
                                    value={color.hex}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="primary" onClick={onHandleSave}>
                                    Crear
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}