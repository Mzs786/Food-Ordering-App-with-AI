import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "/images/home/banner.png";
import spicyNoodles from "/src/images/spicy-noodles.jpg";
import masalaDosa from "/src/images/masala-dosa.jpg";

// Reusable Rating Component
const Rating = ({ value = 3 }) => {
  return (
    <div className="rating rating-sm">
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name="rating"
          className={`mask mask-star-2 ${
            index < value ? "bg-orange-500" : "bg-orange-400"
          }`}
          checked={index === value - 1}
          readOnly
        />
      ))}
    </div>
  );
};

// Food Card Component
const FoodCard = ({ image, name, price, rating }) => (
  <div className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm w-full max-w-[260px]">
    <div className="w-20 h-20 rounded-xl overflow-hidden">
      <img
        src={image}
        alt={`${name} image`}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="space-y-1">
      <h5 className="font-medium text-gray-900">{name}</h5>
      <Rating value={rating} />
      <p className="text-red-500 font-semibold">₹{price.toFixed(2)}</p>
    </div>
  </div>
);

const Banner = () => {
  const featuredFoods = [
    {
      image: spicyNoodles,
      name: "Spicy Noodles",
      price: 70.0,
      rating: 3,
    },
    {
      image: masalaDosa,
      name: "Masala Dosa",
      price: 80.0,
      rating: 4,
    },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 xl:px-24 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={bannerImg}
            alt="Delicious food banner"
            className="rounded-full w-full max-w-[500px]"
          />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            {featuredFoods.map((food, index) => (
              <FoodCard key={index} {...food} />
            ))}
          </div>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 px-4 space-y-7">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Dive into Delights Of Delectable{" "}
            <span className="text-green-600">Food</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <Link to="/menu">
            <button className="bg-green-500 font-semibold text-white px-8 py-3 rounded-full">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
