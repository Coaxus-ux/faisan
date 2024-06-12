import {Card, CardBody, CardHeader} from "@nextui-org/react";
import Props from "prop-types";

AnimalDetailsCard.propTypes = {
    animal: Props.object.isRequired
};

export default function AnimalDetailsCard({animal}) {
    return (<Card className="p-5">
            <CardHeader>
                <h2 className="text-2xl font-bold">Detalles del animal</h2>
            </CardHeader>
            <CardBody className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <p className="font-bold">Nombre</p>
                        <p className="italic">{animal.name}</p>
                    </div>
                    <div>
                        <p className="font-bold">Sexo</p>
                        <p className="italic">{animal.animalSex}</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <p className="font-bold">Nacimiento</p>
                        <p className="italic">{animal.animalBirthDate}</p>
                    </div>
                    <div>
                        <p className="font-bold">FEDEGAN</p>
                        <p className="italic">{animal.animalFEDGAN}</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <p className="font-bold">Numero</p>
                        <p className="italic">{animal.animalFarmNumber}</p>
                    </div>
                    <div>
                        <p className="font-bold">Fecundacion</p>
                        <p className="italic">{animal.fertilisationType.typeFertilisation}</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                        <p className="font-bold">Color</p>
                        <div className="w-8 h-8 rounded-full" style={{backgroundColor: animal.animalColor.animalHex}}/>
                    </div>
                </div>
            </CardBody>
        </Card>)
}