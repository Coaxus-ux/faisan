import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {ReactSearchAutocomplete} from "react-search-autocomplete";

import PropTypes from "prop-types";

SearchBar.propTypes = {
    data: PropTypes.array,
    isOpen: PropTypes.bool,
    onOpenChange: PropTypes.func,
    onAccept: PropTypes.func,

}

export default function SearchBar({data, isOpen, onOpenChange, onAccept}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onOpenChange}
            closeOnOverlayClick={false}
            closeOnEscape={false}
            className="bg-none"
            backdrop="blur"
            classNames={{
                base: "bg-none",


            }}
        >
            <ModalContent className="bg-none">
                <ModalHeader>Buscar </ModalHeader>
                <ModalBody>
                    {
                        data.length > 0 ?
                            <ReactSearchAutocomplete
                                items={data}
                                onSearch={data}
                                maxItems={10}
                                placeholder="Buscar padre"
                            />
                            : null
                    }
                </ModalBody>
                <ModalFooter>
                    <Button auto onClick={onAccept}>Aceptar</Button>
                    <Button auto onClick={onOpenChange}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
