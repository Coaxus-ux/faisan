import {create} from "zustand";
import {initialFilters} from "@/utils/initialFilters";

export const useFiltersStore = create((set, get) => ({
    filters: initialFilters,
    filterKeys: [],
    setGlobalFilters: (filters) => set({filters}),
    getFilters: () => get().filters,
    clearFilters: () => set({filters: initialFilters}),
    filterData: (data) => {
        const filters = get().filters;
        if ( filters === initialFilters ) return set({filterKeys: data});
        const filterKeys = data.filter(item => {
            const farmNumber = item.animalFarmNumber.replace('/', '');
            const fedeganNumber = item.animalFEDGAN || '';
            console.log(filters.bornDate.value)
            return (
                (!filters.bornDate.value || item.animalBirthDate === filters.bornDate.value) &&
                (!filters.state.value || item.state === filters.state.value) &&
                (!filters.birthType.value || item.fertilisationType.typeFertilisation === filters.birthType.value) &&
                (!filters.number.value || farmNumber.startsWith(filters.number.value)) &&
                (!filters.fedeganNumber.value || fedeganNumber.startsWith(filters.fedeganNumber.value))
            );
        });
        set({filterKeys});
    },
    getFilterKeys: () => get().filterKeys,
}));
