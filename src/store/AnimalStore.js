import {create} from "zustand";
import {getUserId} from "@/utils/getUserId";
import axiosInstance from "@/interceptors/axiosInt";
import {notify} from "@/hooks/notify";

export const useAnimalStore = create((set, get) => ({
    animals: [],
    animal: {},
    isResolving: false,
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
    createAnimal: async (animal) => {
        set({isResolving: true})
        await axiosInstance.post('/animal/create', {
            userOwner: getUserId(),
            ...animal
        }).then(() => {
            notify("Animal creado exitosamente");
        }).finally(() => {
            set({isResolving: false})
        });
    },
    getIsResolving: () => get().isResolving,
    getAnimalById: async (id) => {
        set({isResolving: true})
        await axiosInstance.post('/animal/getAnimalById', {
            userOwner: getUserId(),
            animalId: id
        }).then((response) => {
            set({animal: response.data.singleAnimal})
        }).finally(() => {
            set({isResolving: false})
        })
    },
    getAnimal: () => get().animal,
}))

