import React from "react";
import { useManageState } from "../hooks/useManageState";

const BasketCheck = () => {
  const total = useManageState((state) => state.total);
  const totalProducts = useManageState((state) => state.productsAmount);
  const setModal = useManageState((state) => state.setModal);

  return (
    <div className="w-1/4 rounded-xl bg-white shadow p-5 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-bold">Delivery to pick-up point</h1>
        <span className="text-sm font-semibold text-gray-400">
          Shahristan 83A, Ynusobod, Tashkent
        </span>
        <span className="font-medium border-b border-dashed w-40">
          comming february 18
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold text-purple-600 mb-3">
          Select payment method
        </h1>
        <div className="w-full flex items-end justify-between">
          <span className="text-sm font-medium">Products Amount</span>
          <div className="flex-1 border-b border-dashed"></div>
          <span className="text-base font-semibold">{totalProducts}</span>
        </div>
        <div className="w-full flex items-end justify-between">
          <span className="text-sm font-medium">Delivery charge</span>
          <div className="flex-1 border-b border-dashed"></div>
          <span className="text-base font-semibold">$10</span>
        </div>
        <div className="w-full flex items-end justify-between mt-3">
          <span className="text-xl font-bold">Total</span>
          <span className="text-lg font-bold">${total + 10}</span>
        </div>
        <button
          onClick={() => setModal(true)}
          className="mt-4 w-full py-3 rounded-xl bg-purple-600 cursor-pointer text-white font-bold hover:bg-purple-700 duration-200"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default BasketCheck;
