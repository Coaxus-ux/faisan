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
ModalAddFertilisation.propTypes = {
  isUpdate: PropTypes.bool || false,
  fertilisation: PropTypes.object || null,
};
export default function ModalAddFertilisation({
  isUpdate = false,
  fertilisation = null,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onHandleUpdate = () => {};

  const onHandleAdd = () => {};

  const onHandleSubmit = () => {
    console.log("onHandleSubmit");
    if (isUpdate) {
      onHandleUpdate();
    } else {
      onHandleAdd();
    }
  };

  return (
    <>
      <Button color="success" onPress={onOpen}>
        Agregar nuevo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>{isUpdate ? "Editar" : "Agregar"} fertilización</h2>
              </ModalHeader>
              <ModalBody>
                <Input label="Nombre del tipo" placeholder="Nombre del tipo" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onClick={onHandleSubmit}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
