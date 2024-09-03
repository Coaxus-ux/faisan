import {create} from "zustand";
import axiosInstance from "@/interceptors/axiosInt";
import {getUserId} from "@/utils/getUserId";

export const useParentsStore = create((set, get) => ({
    mothers: [],
    fathers: [],
    prospectiveMothers: [],
    prospectiveFathers: [],
    getMothers: () => get().mothers,
    getFathers: () => get().fathers,
    getParentsApi: async () => {
        await axiosInstance.post('/mother/getMothers', {
            userOwner: getUserId()
        }).then((response) => {
            set({mothers: response.data.parents})
        })
        await axiosInstance.post('/father/getFathers', {
            userOwner: getUserId()
        }).then((response) => {
            set({fathers: response.data.parents})
        })
    },
    getProspectiveParents: async (animalBirthDate) => {
        const sexes = ['Hembra', 'Macho'];
        for (const sex of sexes) {
            await axiosInstance.post('/animal/prospectiveParents', {
                userOwner: getUserId(),
                animalSex: sex,
                animalBirthDate
            }).then((response) => {
                if (sex === 'Hembra') {
                    set({mothers: response.data.animal});
                } else {
                    set({fathers: response.data.animal});
                }
            });
        }
    }
}))
