import { useMutation } from "@tanstack/react-query";
import React from "react";
import { IoPricetags } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getProductById } from "../api/product";
import { postProduct } from "../api/basket";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { mutate: addToCart } = useMutation({
    mutationFn: (product) => postProduct(product),
    onSuccess: () => {
      toast.success("Successfylly added!");
    },
    onError: (error) => {
      toast.error("Failed to add product to cart:" + error.message);
    },
  });

  const handleAddToBasket = async () => {
    if (product) {
      const productDetail = await getProductById(product.id);

      const productData = { ...productDetail, quantity: 1 };

      addToCart(productData);
    }
  };

  return (
    <div className="w-full overflow-hidden space-y-2 bg-white shadow rounded-xl">
      <img
        className="w-full h-[250px] object-cover rounded-t-xl hover:opacity-80 cursor-pointer hover:scale-105 transition-transform duration-300"
        src={product.image}
        alt=""
      />
      <div className="p-3 flex flex-col items-start gap-2">
        <h1 className="text-sm font-bold text-purple-600">{product.title}</h1>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <IoPricetags className="text-base text-red" />
          <h1 className="text-xl font-bold text-red">${product.price}</h1>
        </div>
      </div>
      <button
        onClick={handleAddToBasket}
        className="w-full hover:bg-purple-500 duration-150 cursor-pointer rounded-b-xl bg-purple-600 text-white font-semibold flex items-center justify-center p-2 gap-2"
      >
        <MdOutlineShoppingCart className="text-base font-bold" />
        <span className="text-sm font-bold">to cart</span>
      </button>
    </div>
  );
};

export default ProductCard;
