import {create} from "zustand";
import axiosInstance from "../interceptors/axiosInt.js";
import {getUserId} from "@/utils/getUserId.js";
import {notify} from "@/hooks/notify";

export const useColorsStore = create((set, get) => ({
    colors: [],
    getColors: () => get().colors,
    getColorsApi: async () => {
        await axiosInstance.post('/color/all', {
            userOwner: getUserId()
        }).then((response) => {
            set({colors: response.data.colors})
        })
    },
    createColor: async (color) => {
        const {name, hex} = color;
        await axiosInstance.post('/color/create', {
            userOwner: getUserId(),
            nameColor: name,
            hexColor: hex
        }).then(() => {
            notify("Color creado exitosamente");
        });
    },
    updateColorApi: async (color) => {
        await axiosInstance.put('/color/update', color).then(() => {
            notify("Color actualizado exitosamente");
        });
    },
}));