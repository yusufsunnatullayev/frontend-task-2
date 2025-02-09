import { create } from "zustand";

export const useManageState = create((set) => ({
  productsAmount: 0,
  total: 0,
  modal: false,
  setProductsAmount: (totalProducts) =>
    set(() => ({ productsAmount: totalProducts })),
  setTotal: (total) => set(() => ({ total })),
  setModal: (modal) => set(() => ({ modal })),
}));
