import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAnimalStore} from "@/store/AnimalStore.js";
import InputAnimalComponent from "@/components/InputAnimalComponent.jsx";
export default function EditRegister() {
    const {animalId} = useParams();
    const {getAnimalById, getAnimal} = useAnimalStore();
    useEffect(() => {
        getAnimalById(animalId);
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <InputAnimalComponent animalUpdate={getAnimal()}/>
        </>
    )
}