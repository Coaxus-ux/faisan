import {create} from "zustand";
import axiosInstance from "@/interceptors/axiosInt";
import {getUserId} from "@/utils/getUserId";

export const useFertilisationStore = create((set, get) => ({
    fertilisation: [],
    getFertilisations: () => get().fertilisation,
    getAllFertilisation: async () => {
        await axiosInstance.get("/fertilisation/all").then((response) => {
            set({fertilisation: response.data.fertilisation});
        });
    },
    getAvailableFertilisations: async () => {
        await axiosInstance.get("/fertilisation/available").then((response) => {
            set({fertilisation: response.data.fertilisation});
        });
    },
    addFertilisation: async (fertilisationType) => {
        await axiosInstance.post("/fertilisation/create", {
            userOwner: getUserId(),
            fertilisationType,
        })
    },
    updateFertilisation: async (fertilisationState) => {
        const {typeFertilisation, id, typeFertilisationStatus} = fertilisationState;
        await axiosInstance.put("/fertilisation/update", {
            userOwner: getUserId(),
            fertilisationType: typeFertilisation,
            fertilisationTypeId: id,
            fertilisationTypeStatus: typeFertilisationStatus,
        }).then(() => {
            set({fertilisationToUpdate: null});
        });

    },

    fertilisationToUpdate: null,
    setFertilisationToUpdate: (fertilisation) => set({fertilisationToUpdate: fertilisation}),
    getFertilisationToUpdate: () => get().fertilisationToUpdate,
}));
