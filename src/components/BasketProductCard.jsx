import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, updateProduct } from "../api/basket";

const BasketProductCard = ({ product }) => {
  const [amount, setAmount] = useState(product?.quantity || 1);
  const queryClient = useQueryClient();

  const { mutate: deleteBasketProduct, isLoading } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
  });

  const { mutate: updateBasketProduct } = useMutation({
    mutationFn: (updatedProduct) => updateProduct(updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
  });

  const handleDelete = () => {
    if (!product.id) return;
    deleteBasketProduct(product.id);
  };

  useEffect(() => {
    const updatedProduct = { ...product, quantity: amount };
    updateBasketProduct(updatedProduct);
  }, [amount]);

  return (
    <div className="flex flex-col md:flex-row items-start justify-between w-full">
      <div className="flex flex-col md:flex-row items-start justify-between w-4/5">
        <div className="flex items-start gap-3">
          <img
            className="w-[100px] h-[100px] object-cover rounded-lg"
            src={product?.image || "/placeholder.jpg"}
            alt={product?.title || "Product Image"}
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">
              {product?.title || "Loading..."}
            </h1>
            <p className="text-sm w-auto md:w-96">
              {product?.description || "No description available."}
            </p>
            <FiTrash
              onClick={handleDelete}
              className={`text-base mt-3 text-gray-400 cursor-pointer ${
                isLoading ? "cursor-wait" : "hover:text-black"
              } duration-200`}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            disabled={amount <= 1}
            onClick={() => setAmount((prev) => prev - 1)}
            className={`w-7 h-7 bg-gray-100 cursor-pointer text-base font-bold text-center rounded-md ${
              amount <= 1 && "text-gray-400"
            }`}
          >
            -
          </button>
          <span>{amount}</span>
          <button
            onClick={() => setAmount((prev) => prev + 1)}
            className="w-7 h-7 bg-gray-100 cursor-pointer text-base font-bold text-center rounded-md"
          >
            +
          </button>
        </div>
      </div>
      <p className="text-lg font-bold text-red">
        ${product?.price * product?.quantity || "0.00"}
      </p>
    </div>
  );
};

export default BasketProductCard;
