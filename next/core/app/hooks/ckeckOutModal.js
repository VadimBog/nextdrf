import create from "zustand";

const useCheckOutModal = create((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useCheckOutModal;
