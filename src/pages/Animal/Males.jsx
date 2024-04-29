import SearchComponent from "@/components/SearchComponent.jsx";
import MasterTable from "@/components/MasterTable.jsx";
import {useAnimalStore} from "@/store/AnimalStore.js";
import {useEffect, useState} from "react";
import {TIanimal} from "@/utils/columns.js";
import {useFiltersStore} from "@/store/filtersStore.js";

export default function Males() {
    const {getMalesAnimals, getMales} = useAnimalStore();
    const {filterData, filters, getFilterKeys} = useFiltersStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            getMalesAnimals("Macho").then(() => {
                setIsLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isLoading) {
            filterData(getMales());
        }
    }, [filters, isLoading, getMales, filterData]);

    return (
        <div className="flex flex-col gap-2 max-w-fit mx-auto max-h-4xl mt-10">
            <SearchComponent/>
            {isLoading ? (
                <p>Loading...</p> // Render loading indicator while API call is in progress
            ) : (
                <MasterTable columns={TIanimal} data={getFilterKeys()}/>
            )}
        </div>
    );
}
