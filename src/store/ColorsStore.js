import {create} from "zustand";
import axiosInstance from "../interceptors/axiosInt.js";
import {getUserId} from "@/utils/getUserId.js";
import {notify} from "@/hooks/notify";
export const useColorsStore = create((set, get) => ({
    colors: [],
    getColorsApi: async () => {
        await axiosInstance.post('/color/all', {
            userOwner: getUserId()
        }).then((response) => {
            set({colors: response.data.colors})
        })
    },
    getColors: () => get().colors,
    createColor: async (color) => {
        const {name, hex} = color;
        await axiosInstance.post('/color/create', {
            userOwner: getUserId(),
            nameColor: name,
            hexColor: hex
        }).then((response) => {
            notify("Color creado exitosamente");
        });
    }
}));