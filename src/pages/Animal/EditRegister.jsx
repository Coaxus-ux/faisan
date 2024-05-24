import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAnimalStore} from "@/store/AnimalStore.js";
import InputAnimalComponent from "@/components/InputAnimalComponent.jsx";

export default function EditRegister() {
    const {animalId} = useParams();
    const {getAnimalById, getAnimal} = useAnimalStore();
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        getAnimalById(animalId).then(() => {
            setAnimal(getAnimal());
        });
    }, [animalId, getAnimalById, getAnimal]);

    return (
        <>
            {animal && <InputAnimalComponent animalUpdate={animal}/>}
        </>
    );
}