import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useManageState } from "../hooks/useManageState";

const Navbar = () => {
  const productsAmount = useManageState((state) => state.productsAmount);

  return (
    <nav className="w-full bg-white shadow flex items-center justify-between p-5 px-[8%]">
      <Link className="text-2xl text-purple-600 font-bold" to="/">
        Products
      </Link>
      <Link className="flex" to={"/basket"}>
        <MdOutlineShoppingCart className="text-2xl text-purple-600 font-semibold" />
        {productsAmount > 0 && (
          <sup className="w-5 h-5 rounded-full text-white bg-purple-600 flex items-center justify-center font-medium">
            {productsAmount}
          </sup>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
