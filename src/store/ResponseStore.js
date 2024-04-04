import {create} from 'zustand';

export const useResponsive = create((set, get) => ({
    isOpen: false,
    toggle: () => set({isOpen: !get().isOpen}),
    getState: () => get().isOpen
}));