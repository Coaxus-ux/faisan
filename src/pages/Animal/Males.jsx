import SearchComponent from "@/components/SearchComponent.jsx";
import MasterTable from "@/components/MasterTable.jsx";
import {useAnimalStore} from "@/store/AnimalStore.js";
import {useEffect, useState} from "react";
import {TIanimal} from "@/utils/columns.js";


export default function Males() {
    const {getMalesAnimals, getMales} = useAnimalStore()
    useEffect(() => {
        getMalesAnimals("Macho");
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex flex-col gap-2 max-w-fit mx-auto max-h-4xl mt-10">
            <SearchComponent/>
            <MasterTable columns={TIanimal} data={getMales()}/>
        </div>
    )
}