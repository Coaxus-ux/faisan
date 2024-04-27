import {create} from "zustand";
import {initialFilters} from "@/utils/initialFilters";
export const useFiltersStore = create((set, get) => ({
    filters: initialFilters,
    setGlobalFilters: (filters) => set({filters}),
    getFilters: () => get().filters,
    clearFilters: () => set({filters: initialFilters}),
}));
