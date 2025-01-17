import {
    Card, CardHeader, CardBody, CardFooter, Button, Input, DateInput, AutocompleteItem, Autocomplete
} from "@nextui-org/react";
import {VscGitPullRequestCreate} from "react-icons/vsc";
import {useFertilisationStore} from "@/store/FertilisationStore";
import {useColorsStore} from "@/store/ColorsStore.js";
import {useEffect, useState} from "react";
import {useAnimalStore} from "@/store/AnimalStore.js";
import {notify} from "@/hooks/notify.jsx";
import {parseDate} from "@internationalized/date";
import PropTypes from 'prop-types';
import {SAanimal} from "@/utils/columns";
import {padTo2Digits} from "@/utils/padTo2Digits";
import AutocompleteComponent from "@/components/AutocompleteComponent.jsx";

InputAnimalComponent.propTypes = {
    animalUpdate: PropTypes.object
}


export default function InputAnimalComponent({animalUpdate}) {
    const {getAvailableFertilisations, getFertilisations} = useFertilisationStore();
    const {createAnimal, getIsResolving, updateAnimal} = useAnimalStore();
    const [animal, setAnimal] = useState(SAanimal);
    const {getColorsApi, getColors} = useColorsStore();
    useEffect(() => {
        getAvailableFertilisations();
        getColorsApi();
        if (animalUpdate) {

            const {animalMother, animalFather, ...rest} = animalUpdate;

            const updatedAnimal = {
                name: rest.name,
                animalFarmNumber: rest.animalFarmNumber,
                animalFEDGAN: rest.animalFEDGAN,
                animalBirthDate: rest.animalBirthDate,
                fertilisationType: rest.fertilisationType.id,
                animalColor: rest.animalColor.id,
                animalSex: rest.animalSex,
            };
            if (animalMother) {
                updatedAnimal.animalMother = animalMother.id;
            }
            if (animalFather) {
                updatedAnimal.animalFather = animalFather.id;
            }
            setAnimal(updatedAnimal);
        }

        return () => {
            setAnimal(SAanimal);
        };
    }, [animalUpdate]);

    const onHandleChangeParentsInput = (e, sex) => {
        const key = sex === "Macho" ? "animalFather" : "animalMother";
        setAnimal({
            ...animal, [key]: e
        });
    };
    const onHandleChange = (e) => {
        if (!Object.prototype.hasOwnProperty.call(e, "target")) {
            setAnimal({
                ...animal,
                animalBirthDate: `${e.year}-${padTo2Digits(e.month)}-${padTo2Digits(e.day)}T00:00:00.000Z`
            })
            return;
        }
        setAnimal({
            ...animal, [e.target.name]: e.target.value
        });
    };

    const onHandleCreate = () => {
        console.log(animal);
        for (const key of Object.keys(animal)) {
            if (animal[key] === "" || animal[key] === null || animal[key] === undefined) {
                if (key !== "animalFEDGAN" && key !== "animalFather" && key !== "animalMother") {
                    notify("Por favor llene todos los campos", "error");
                    return;
                }
            }
        }

        if (!animalUpdate) {
            createAnimal(animal);
            setAnimal(SAanimal)
            return;
        }

        updateAnimal(animal, animalUpdate.id).then(() => {
            window.history.back();
        });
    };

    const onHandleBack = () => {
        window.history.back();
    }

    const getFormatedDate = () => {
        const dateNow = new Date();
        try {
            const {animalBirthDate} = animalUpdate;
            const dateToPrint = animalBirthDate.split('T')[0];
            return dateToPrint;
        } catch (e) {
            return `${dateNow.getFullYear()}-${padTo2Digits(dateNow.getMonth() + 1)}-${padTo2Digits(dateNow.getDate())}`;
        }
    };

    return (
        <section className="flex justify-center items-center h-lvh gap-4">
            <Card className="p-4">
                <CardHeader>
                    <div className="flex gap-2 items-center">
                        <VscGitPullRequestCreate size="30"/>
                        <h3 className="font-bold text-2xl"> {animalUpdate ? "Editar Animal" : "Crear Animal"}</h3>

                    </div>
                </CardHeader>
                <CardBody className="flex justify-center gap-2 p-8">
                    <p className="my-3 text-md font-semibold">Datos del animal</p>
                    <div className="flex gap-2">
                        <Input isRequired type="text" variant="flat" label="Nombre del animal" name="name"
                               onChange={onHandleChange}
                               value={animal.name || ""}
                        />
                        <Input isRequired type="text" variant="flat" label="Numero del animal" name="animalFarmNumber"
                               onChange={onHandleChange}
                               value={animal.animalFarmNumber || ""}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Input type="text" variant="flat" label="Numero FEDEGAN" name="animalFEDGAN"
                               onChange={onHandleChange}
                               value={animal.animalFEDGAN || ""}
                        />
                        <DateInput
                            isRequired
                            label="Fecha de nacimiento"
                            onChange={onHandleChange}
                            name="animalBirthDate"
                            granularity="day"
                            defaultValue={parseDate(getFormatedDate())}
                        />
                    </div>

                    <div className="flex gap-2 justify-center">
                        <Autocomplete
                            label="Tipo de nacimiento"
                            defaultItems={getFertilisations()}
                            name="fertilisationType"
                            onKeyDown={(e) => e.continuePropagation()}
                            isRequired
                            selectedKey={animal.fertilisationType}
                            onSelectionChange={
                                (e) => {
                                    setAnimal({
                                        ...animal, fertilisationType: e
                                    });
                                }
                            }
                        >
                            {(item) => <AutocompleteItem key={item.id}>{item.typeFertilisation}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            label="Color del animal"
                            defaultItems={getColors()}
                            name="animalColor"
                            isRequired
                            onKeyDown={(e) => e.continuePropagation()}
                            selectedKey={animal.animalColor}
                            onSelectionChange={
                                (e) => {
                                    setAnimal({
                                        ...animal, animalColor: e
                                    });

                                }
                            }
                        >
                            {(item) => <AutocompleteItem key={item.id}>{item.animalColor}</AutocompleteItem>}
                        </Autocomplete>
                        <Autocomplete
                            label="Sexo del animal"
                            name="animalSex"
                            isRequired
                            onKeyDown={(e) => e.continuePropagation()}
                            selectedKey={animal.animalSex}
                            onSelectionChange={
                                (e) => {
                                    setAnimal({
                                        ...animal, animalSex: e
                                    });
                                }
                            }
                        >
                            <AutocompleteItem key="Macho">Macho</AutocompleteItem>
                            <AutocompleteItem key="Hembra">Hembra</AutocompleteItem>
                        </Autocomplete>
                    </div>


                    <div className="flex flex-col">
                        <p className="my-3 text-md font-semibold">Datos de los padres</p>
                        <div className="flex gap-3">
                            <AutocompleteComponent label={"Padre"} sex={"Macho"}
                                                   birthDate={animalUpdate ? animalUpdate.animalBirthDate : `${getFormatedDate()}T00:00:00`}
                                                   disabled={true}
                                                   onHandleChangeParentsInput={onHandleChangeParentsInput}
                                                   filterText={animalUpdate && animalUpdate.animalMother ? animalUpdate.animalFather.idAnimal : ""}
                            />
                            <AutocompleteComponent label={"Madre"} sex={"Hembra"}
                                                   birthDate={animalUpdate ? animalUpdate.animalBirthDate : `${getFormatedDate()}T00:00:00`}
                                                   disabled={true}
                                                   onHandleChangeParentsInput={onHandleChangeParentsInput}
                                                   filterText={animalUpdate && animalUpdate.animalMother ? animalUpdate.animalMother.idAnimal : ""}

                            />
                        </div>
                    </div>

                </CardBody>
                <CardFooter className="flex gap-2 justify-end">
                    <Button color="success" onClick={onHandleCreate} isLoading={getIsResolving()}>Guardar</Button>
                    <Button color="danger" variant="flat" onClick={onHandleBack}>Volver</Button>
                </CardFooter>
            </Card>
        </section>
    )
}
