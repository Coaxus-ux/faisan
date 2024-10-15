import {create} from "zustand";
import axiosInstance from "@/interceptors/axiosInt";
import {getUserId} from "@/utils/getUserId";

export const useParentsStore = create((set, get) => ({
    mothers: [],
    fathers: [],
    getMothers: () => get().mothers,
    getFathers: () => get().fathers,
    getProspectiveParents: async (animalBirthDate, searchParam, animalSex) => {
        if (animalBirthDate.slice(-1) === 'Z') {
            animalBirthDate = animalBirthDate.slice(0, -1);
        }
        const response = await axiosInstance.post('/animal/prospectiveParents', {
            userOwner: getUserId(),
            searchParam: searchParam,
            animalSex: animalSex,
            animalBirthDate
        });
        return response.data.animal;
    }
}))

