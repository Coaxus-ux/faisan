import {create} from "zustand";
import axiosInstance from "@/interceptors/axiosInt";
import {getUserId} from "@/utils/getUserId";

export const useParentsStore = create((set, get) => ({
    mothers: [],
    fathers: [],
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
}))
