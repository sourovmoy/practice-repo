import React from "react";
import { Link } from "react-router-dom";
import { useWishList } from "../context/WishListContext";

const HorSlider = ({ product = {}, home }) => {
  // Destructure safely
  const {
    _id,
    img = "",
    title = "",
    sellPrice = 0,
    mrp = 0,
    discount = 0,
    brand = "",
    category = "",
    rating = 0,
  } = product;

  const { toggleItemWishList, list } = useWishList();

  // Calculate discounted price if needed
  const discountedPrice = sellPrice; // already provided
  const formattedMRP = new Intl.NumberFormat("en-IN").format(mrp);
  const formattedSellPrice = new Intl.NumberFormat("en-IN").format(sellPrice);

  return (
    <div>
      <div className="xs:m-2 xs:text-xs md:text-sm xs:w-[180px] xs:h-[250px] md:w-[250px] md:h-[300px] flex flex-col justify-between border-1 hover:border-black p-2 relative">
        {/* Wishlist button & Best Seller badge */}
        <div>
          <button
            onClick={() => toggleItemWishList(_id)}
            className="z-10 w-4 h-4 absolute left-1 top-0"
          >
            {list.includes(_id) ? "❤️" : "🤍"}
          </button>

          {/* Best Seller badge */}
          {rating > 3.9 && !home && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs md:text-sm px-1 rounded-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Product image */}
        <div className="xs:h-2/3 sm:h-1/2 md:h-2/3 md:w-5/6 flex items-center">
          <Link to={`/product-details/${_id}`}>
            <img src={img} alt={title} className="w-full h-full object-cover" />
          </Link>
        </div>

        {/* Product title */}
        <p className="font-medium mt-1">{title}</p>

        {/* Category and Brand */}
        <div className="flex items-center justify-between text-gray-400 xs:text-sm">
          <p>
            {category === "child"
              ? "Kids"
              : category === "men"
                ? "Men's"
                : category === "women"
                  ? "Women's"
                  : "Unisex"}{" "}
            Shoes
          </p>
          <p>{brand}</p>
        </div>

        {/* Price, MRP, Discount */}
        <div className="flex items-center gap-2 xs:text-xs md:text-sm mt-1">
          <p className="font-extrabold">₹ {formattedSellPrice}</p>
          <p className="line-through text-gray-400">{formattedMRP}</p>
          {discount > 0 && <p className="text-red-500">{discount}% off</p>}
        </div>
      </div>
    </div>
  );
};

export default HorSlider;
