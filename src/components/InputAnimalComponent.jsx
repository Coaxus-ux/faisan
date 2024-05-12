import {
    Card, CardHeader, CardBody, CardFooter, Button, Input, DateInput, AutocompleteItem, Autocomplete
} from "@nextui-org/react";
import {VscGitPullRequestCreate} from "react-icons/vsc";
import {useFertilisationStore} from "@/store/FertilisationStore";
import {useColorsStore} from "@/store/ColorsStore.js";
import {useEffect, useState} from "react";
import {useAnimalStore} from "@/store/AnimalStore.js";
import {notify} from "@/hooks/notify.jsx";
import {CalendarDate, parseDate} from "@internationalized/date";
import PropTypes from 'prop-types';
import {isEmpty} from "@/utils/objectLength";
InputAnimalComponent.propTypes = {
    animalUpdate: PropTypes.object
}
export default function InputAnimalComponent(animalUpdate) {
    const [isMounted, setIsMounted] = useState(false);
    const {getAllFertilisation, getFertilisations} = useFertilisationStore();
    const {createAnimal, getIsResolving} = useAnimalStore();

    const [animal, setAnimal] = useState({
        name: "",
        animalFarmNumber: "",
        animalFEDGAN: "",
        animalBirthDate: "",
        fertilisationType: "",
        animalColor: "",
        animalSex: ""
    });

    const {getColorsApi, getColors} = useColorsStore();
    useEffect(() => {
        if (!isMounted) {
            getAllFertilisation();
            getColorsApi();
            if (animalUpdate) {
                setAnimal(animalUpdate);
            }
            setIsMounted(true);
        }
        // eslint-disable-next-line
    }, []);
    const animalProperties = Object.values(animal);
    const onHandleChange = (e) => {
        if (!Object.prototype.hasOwnProperty.call(e, "target")) {
            setAnimal({
                ...animal,
                animalBirthDate: `${e.year}-${e.month}-${e.day}T00:00:00.000Z`
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
        window.history.back();
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const getDate = () => {
        try {
            if (isEmpty(animalUpdate)) {
                const dateNow = new Date();
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
                               value={animal.name}
                        />
                        <Input isRequired type="text" variant="flat" label="Numero del animal" name="animalFarmNumber"
                               onChange={onHandleChange}/>
                    </div>
                    <div className="flex gap-2">
                        <Input type="text" variant="flat" label="Numero FEDEGAN" name="animalFEDGAN"
                               onChange={onHandleChange}
                               value={animal.animalFEDGAN}
                        />
                        <DateInput
                            isRequired
                            label="Birth date"
                            onChange={onHandleChange}
                            name="animalBirthDate"
                            defaultValue={parseDate(getDate())}
                            // defaultValue={parseDate("2024-04-12")}
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

                </CardBody>
                <CardFooter className="flex gap-2 justify-end">
                    <Button color="success" onClick={onHandleCreate} isLoading={getIsResolving()}>Guardar</Button>
                    <Button color="danger" variant="flat" onClick={onHandleBack}>Volver</Button>
                </CardFooter>
            </Card>
        </section>
    )
}