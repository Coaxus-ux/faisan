import {create} from "zustand";
import axios from "axios";

export const useFertilisationStore = create((set, get) => ({
    fertilisation: [],
    getFertilisation: () => get().fertilisation,
    getAllFertilisation: async () => {
        console.log("getAllFertilisation", localStorage.getItem("token"))
        const _1 =import.meta.env.VITE_SERVER_URL + "/fertilisation/all";
        const _2 = import.meta.env.VITE_SERVER_URL + "/dashboard";

        await axios.get(_1, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MjA3MmNmZS05YjdmLTRkNmItODQwMy02MWJhMDU3NDIxM2EiLCJpYXQiOjE3MTIwMjUxNDgsImV4cCI6MTcxMjAyODc0OH0.QcJI3s-WWTKNL8mgAJXFUILqpzAPA03SlxtG1KCRA2k`
            }
        }).then((response) => {
            console.log("response", response.data)
            set({fertilisation: response.data})
        }).catch((error) => {
            console.log("error", error)
        })
    },

}));