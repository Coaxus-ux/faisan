import {create} from "zustand";
import axiosInstance from "@/interceptors/axiosInt";
export const useFertilisationStore = create((set, get) => ({
    fertilisation: [],
    getFertilisations: () =>  get().fertilisation,
    getAllFertilisation: async () => {
        await axiosInstance.get('/fertilisation/all').then((response) => {
            set({fertilisation: response.data.fertilisation})
        })
    },
}));