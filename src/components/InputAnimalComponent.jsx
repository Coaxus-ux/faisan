import {
    Card, CardHeader, CardBody, CardFooter, Button, Input, DateInput, AutocompleteItem, Autocomplete
} from "@nextui-org/react";
import {VscGitPullRequestCreate} from "react-icons/vsc";
import {useFertilisationStore} from "@/store/FertilisationStore";
import {useColorsStore} from "@/store/ColorsStore.js";
import {useEffect, useState} from "react";
import {useAnimalStore} from "@/store/AnimalStore.js";
import {useParentsStore} from "@/store/ParentsStore.js";
import {notify} from "@/hooks/notify.jsx";
import {parseDate} from "@internationalized/date";
import PropTypes from 'prop-types';
import {isEmpty} from "@/utils/objectLength";

InputAnimalComponent.propTypes = {
    animalUpdate: PropTypes.object
}
export default function InputAnimalComponent({animalUpdate}) {
    const [isMounted, setIsMounted] = useState(false);
    const {getAllFertilisation, getFertilisations} = useFertilisationStore();
    const {createAnimal, getIsResolving} = useAnimalStore();
    const {getParentsApi, getMothers, getFathers} = useParentsStore();
    const [animal, setAnimal] = useState({
        name: "",
        animalFarmNumber: "",
        animalFEDGAN: "",
        animalBirthDate: "",
        fertilisationType: "",
        animalColor: "",
        animalSex: "",
        animalFather: "",
        animalMother: ""
    });

    const {getColorsApi, getColors} = useColorsStore();
    useEffect(() => {
        if (!isMounted) {
            getAllFertilisation();
            getColorsApi();
            getParentsApi();
            setIsMounted(true);
            if (animalUpdate) {
                setAnimal(
                    {
                        name: animalUpdate.name,
                        animalFarmNumber: animalUpdate.animalFarmNumber,
                        animalFEDGAN: animalUpdate.animalFEDGAN,
                        animalBirthDate: animalUpdate.animalBirthDate,
                        fertilisationType: animalUpdate.fertilisationType.id,
                        animalColor: animalUpdate.animalColor,
                        animalSex: animalUpdate.animalSex,
                        animalFather: animalUpdate.animalFather,
                        animalMother: animalUpdate.animalMother
                    }
                );
                return;
            }
            setAnimal(
                {
                    ...animal,
                    animalBirthDate: `${dateNow.getFullYear()}-${padTo2Digits(dateNow.getMonth() + 1)}-${padTo2Digits(dateNow.getDate())}T00:00:00.000Z`
                }
            )
        }
        // eslint-disable-next-line
    }, []);
    const animalProperties = Object.values(animal);
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
        if (!animalProperties.every(propety => propety !== "")) {
            notify("Por favor llene todos los campos", "error");
            return;
        }
        if (isEmpty(animalUpdate)) {
            createAnimal(animal);
            return;
        }

        //createAnimal(animal)
    };
    const onHandleBack = () => {
        console.log(animal);
        /*window.history.back();*/
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const dateNow = new Date();
    const getDate = () => {
        try {
            if (isEmpty(animalUpdate)) {

                return `${dateNow.getFullYear()}-${padTo2Digits(dateNow.getMonth() + 1)}-${padTo2Digits(dateNow.getDate())}`;
            }
            const {animalBirthDate} = animal;
            if (animalBirthDate !== "") {
                return parseDate("2024-04-12")
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <section className="flex justify-center items-center h-lvh gap-4">
            <Card className="p-4">
                <CardHeader>
                    <div className="flex gap-2 items-center">
                        <VscGitPullRequestCreate size="30"/>
                        <h3 className="font-bold text-2xl">Crear Animal</h3>
                    </div>
                </CardHeader>
                <CardBody className="flex justify-center gap-2 p-8">
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
                            label="Birth date"
                            onChange={onHandleChange}
                            name="animalBirthDate"
                            defaultValue={parseDate(getDate())}
                        />
                    </div>
                    <div className="flex gap-2 justify-center">
                        <Autocomplete
                            label="Tipo de nacimiento"
                            defaultItems={getFertilisations()}
                            name="fertilisationType"
                            onKeyDown={(e) => e.continuePropagation()}
                            isRequired
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
                    <div className="flex gap-2">
                        <Autocomplete
                            label="Padre"
                            name="animalFather"
                            defaultItems={getFathers()}
                            onKeyDown={(e) => e.continuePropagation()}
                            onSelectionChange={
                                (e) => {
                                    setAnimal({
                                        ...animal, animalFather: e
                                    });
                                }
                            }
                        >
                            {(item) => {
                                let itemString = `${item.parent.name} - ${item.parent.animalFarmNumber}`
                                return <AutocompleteItem key={item.father.id}>
                                    {itemString}
                                </AutocompleteItem>
                            }
                            }
                        </Autocomplete>
                        <Autocomplete
                            label="Madre"
                            name="animalMother"
                            defaultItems={getMothers()}
                            onKeyDown={(e) => e.continuePropagation()}
                            onSelectionChange={
                                (e) => {
                                    setAnimal({
                                        ...animal, animalMother: e
                                    });
                                }
                            }
                        >
                            {(item) => {
                                let itemString = `${item.parent.name} - ${item.parent.animalFarmNumber}`
                                return <AutocompleteItem key={item.mother.id}>
                                    {itemString}
                                </AutocompleteItem>
                            }
                            }
                        </Autocomplete>
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