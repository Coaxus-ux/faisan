import {Card, CardBody, CardHeader} from "@nextui-org/react";
import Props from "prop-types";
import {differenceInCalendarDays, differenceInCalendarMonths, differenceInCalendarYears} from "date-fns";

AnimalDetailsCard.propTypes = {
    animal: Props.object.isRequired
};

export default function AnimalDetailsCard({animal}) {
    const dateNow = new Date();
    const months = differenceInCalendarMonths(dateNow, new Date(animal.animalBirthDate)) % 12
    let days = differenceInCalendarDays(dateNow, new Date(animal.animalBirthDate)) % 30 - 1
    days < 0 ? days = 0 : days
    const years = differenceInCalendarYears(dateNow, new Date(animal.animalBirthDate))
    return (<Card className="p-5 h-[508px]" >
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
                    <p className="italic">{animal.animalBirthDate.split("T")[0]}</p>
                    <span className="italic text-sm text-gray-400">{years} años {months} meses {days} días</span>
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