import SearchComponent from "@/components/SearchComponent.jsx";
import MasterTable from "@/components/MasterTable.jsx";
import {useAnimalStore} from "@/store/AnimalStore.js";
import {useEffect, useState} from "react";
import {TIanimal} from "@/utils/columns.js";
import {useFiltersStore} from "@/store/filtersStore.js";
import Loader from "@/components/Loader.jsx";

export default function Males() {
    const {getAnimalsBySex, getAnimals} = useAnimalStore();
    const {filterData, filters, getFilterKeys} = useFiltersStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            getAnimalsBySex("Macho").then(() => {
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isLoading) {
            filterData(getAnimals());
        }
    }, [filters, isLoading, getAnimals, filterData]);

    return (
        <div className="flex flex-col gap-2 max-w-fit mx-auto max-h-4xl mt-10">
            <SearchComponent/>
            {isLoading ? (
                <Loader/>
            ) : (
                <MasterTable columns={TIanimal} data={getFilterKeys()}/>
            )}
        </div>
    );
}
