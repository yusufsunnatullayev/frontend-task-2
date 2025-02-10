import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../api/product";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  if (isLoading) return <div className="loader"></div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className="w-full px-[8%] py-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default Home;
