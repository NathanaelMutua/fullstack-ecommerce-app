import { create } from "zustand";

export const useCart = create((set) => ({
  items: [],

  addProduct: (product: any) =>
    set((state) => {
      items: [...state.items, { product }];
    }),

  resetCart: () => set({ items: [] }),
}));
