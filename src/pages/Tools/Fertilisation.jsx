import {useEffect} from "react";
import {useFertilisationStore} from "@/store/FertilisationStore.js";

import HeaderWithBreadcrumbs from "@/components/HeaderWithBreadcrumbs.jsx";
import {Card, CardBody} from "@nextui-org/react";
import FertilisationManager from "@/components/FertilisationManager.jsx";
import FertilisationList from "@/components/FertilisationList.jsx";

export default function Fertilisation() {
    const {getFertilisations, getAllFertilisation, setFertilisationToUpdate} = useFertilisationStore();
    useEffect(() => {
        getAllFertilisation();
        setFertilisationToUpdate(null);
        // eslint-disable-next-line
    }, []);
    return (
        <div className="m-10">
            <HeaderWithBreadcrumbs
                breadcrumbTitle="Tipos de nacimientos"
                pageTitle="Gestión de Tipos de nacimientos"
            />
            <div className="flex justify-center items-center gap-4">
                <Card className="md:min-w-[520px] min-w-full">
                    <CardBody className="p-7">
                        <p className="font-bold text-sm pb-3">Nuevo tipo de nacimiento </p>
                        <FertilisationManager/>
                        <FertilisationList fertilisations={getFertilisations()}/>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
