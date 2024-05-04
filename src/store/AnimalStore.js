import {create} from "zustand";
import {getUserId} from "@/utils/getUserId";
import axiosInstance from "@/interceptors/axiosInt";

export const useAnimalStore = create((set, get) => ({
    animals: [],
    getAnimalsApi: async () => {
        await axiosInstance.post('/animal/all', {
            userOwner: getUserId()
        }).then((response) => {
            set({animals: response.data.animal})
        })
    },

    getAnimalsBySex: async (sex) => {
        await axiosInstance.post('/animal/bySex', {
            userOwner: getUserId(),
            animalSex: sex
        }).then((response) => {
                set({animals: response.data.animal})
            }
        )
    },
    getAnimals: () => {
        return get().animals
    },
}))

