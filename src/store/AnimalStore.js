import {create} from "zustand";
import axios from "axios";
import {getUserId} from "@/utils/getUserId";
export const useAnimalStore = create((set, get) => ({
    animals: [],
    getAnimals: async () => {
        await axios({
            method: 'post',
            url: import.meta.env.VITE_SERVER_URL + '/animal/all',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            data: {
                userOwner: getUserId()
            }
        }).then((response) => {
            set({animals: response.data.animal})
        }).catch((error) => {
            console.error(error)
        })
    },
    getMales: () => {
        return get().animals.filter((animal) => animal.animalSex === 'Macho')
    }
}))

