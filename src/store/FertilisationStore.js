import {create} from "zustand";
import axios from "axios";

const token = localStorage.getItem("token")
export const useFertilisationStore = create((set, get) => ({
    fertilisation: [],
    getFertilisations: () =>  get().fertilisation,
    getAllFertilisation: async () => {
        await axios(
            {
                method: 'get',
                url: import.meta.env.VITE_SERVER_URL + '/fertilisation/all',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                console.log(response.data.fertilisation)
                set({fertilisation: response.data.fertilisation})
            })
            .catch((error) => {
                console.error(error)
            })
    },

}));