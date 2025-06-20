import { create } from "zustand";

export const useTheme = create((set) => ({
    theme: localStorage.getItem('preferred-theme') || 'forest',
    setTheme: (theme) => {
        localStorage.setItem('preferred-theme', theme);
        set({theme})
    }
}))