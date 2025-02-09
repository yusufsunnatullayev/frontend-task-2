import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBasketProducts } from "../api/basket";
import BasketProductCard from "../components/BasketProductCard";
import { useNavigate } from "react-router-dom";
import BasketCheck from "../components/BasketCheck";
import { useManageState } from "../hooks/useManageState";
import PaymentModal from "../components/PaymentModal";

const Basket = () => {
  const navigate = useNavigate();
  const setProductsAmount = useManageState((state) => state.setProductsAmount);
  const setTotal = useManageState((state) => state.setTotal);
  const modal = useManageState((state) => state.modal);
  const {
    data: basketProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["basket"],
    queryFn: getBasketProducts,
  });

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (isError) {
    return <div>Error loading basket products.</div>;
  }

  const total = basketProducts.reduce(
    (acc, product) => acc + Number(product.price) * Number(product.quantity),
    0
  );

  setTotal(total);

  const totalProducts = basketProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  setProductsAmount(totalProducts);

  return (
    <section className="w-full px-[8%] py-10">
      {basketProducts && basketProducts.length ? (
        <div className="w-full flex items-start justify-between gap-10">
          <div className="w-3/4 rounded-xl bg-white shadow p-5">
            <h1 className="text-2xl font-semibold mb-7">
              Basket{" "}
              <span className="text-sm text-gray-400">
                {totalProducts} products
              </span>
            </h1>
            <div className="flex flex-col gap-5">
              {basketProducts.map((product) => (
                <BasketProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <BasketCheck />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center py-20">
          <h1 className="text-9xl text-purple-100 font-semibold mb-7">
            empty basket
          </h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-purple-600 font-semibold text-white rounded-md hover:bg-purple-700 duration-200 cursor-pointer"
          >
            Go shopping
          </button>
        </div>
      )}
      {modal && <PaymentModal />}
    </section>
  );
};

export default Basket;
