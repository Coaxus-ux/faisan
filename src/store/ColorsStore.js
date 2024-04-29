import {create} from "zustand";
import axiosInstance from "../interceptors/axiosInt.js";
import {getUserId} from "@/utils/getUserId.js";

export const useColorsStore = create((set, get) => ({
    colors: [],
    getColorsApi: async () => {
        await axiosInstance.post('/color/all', {
            userOwner: getUserId()
        }).then((response) => {
            set({colors: response.data.colors})
        })
    },
    getColors: () => get().colors
}));