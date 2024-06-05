import {create} from 'zustand'
import axios from "axios";
export const useLoginStore = create((set, get) => ({
    isLogged: localStorage.getItem('token') !== null,
    isLoading: false,
    login: async (email, password, rememberMe) => {
        set({isLoading: true})
        await axios({
            method: 'post',
            url: import.meta.env.VITE_SERVER_URL + '/auth/login',
            data: {
                email: email,
                password: password,
                rememberMe: rememberMe
            }
        }).then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            set({isLoading: false, isLogged: true})
        }).catch((error) => {
            console.error(error)
            set({isLoading: false})
        })
    },
    getIsLogged: () => {
        return get().isLogged
    },
    logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        set({isLogged: false})
        window.location.href = '/auth/login'
    },
}))