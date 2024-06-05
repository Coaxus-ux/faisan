import {create} from "zustand";
import axiosInstance from "@/interceptors/axiosInt";
import {getUserId} from "@/utils/getUserId.js";

export const useWeightStore = create((set, get) => ({
    weights: [],
    getWeights: () => get().weights,
    getWeightAPI: async (animalId) => {
        await axiosInstance.post('/weight/getByAnimalId',
            {
                userOwner: getUserId(),
                animalId: animalId
            }
        ).then((response) => {
            set({weights: response.data.weight})
        })
    },
    saveWeightAPI: async (animalId, weight, date, description) => {
        await axiosInstance.post('/weight/create',
            {
                userOwner: getUserId(),
                animalId: animalId,
                weightAnimal: weight,
                dateWeight: date,
                weighingDescription: description
            }
        )
    },
    updateWeightAPI: async (animalId, weight, date, description, id) => {
        await axiosInstance.put('/weight/updateById',
            {
                id: id,
                userOwner: getUserId(),
                animalId: animalId,
                weightAnimal: weight,
                dateWeight: date,
                weighingDescription: description
            }
        )
    }
}));