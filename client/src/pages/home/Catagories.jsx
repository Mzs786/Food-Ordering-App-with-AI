import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import axios from "axios";
import { FaRupeeSign, FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart";

const RecommandPage = () => {
  const { user } = useContext(AuthContext);
  const [categoryItems, setCategoryItems] = useState([]);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6001";

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`${BASE_URL}/suggested-items?email=${user.email}`)
        .then((response) => {
          setCategoryItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching suggested items:", error);
        });
    }
  }, [user, BASE_URL]);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: item._id,
        name: item.name,
        quantity: 1,
        image: item.image,
        price: item.price,
        email: user.email,
      };

      axios
        .post(`${BASE_URL}/carts`, cartItem)
        .then(() => {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Food added to the cart.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error(error.response?.data?.message || error.message);
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${error.response?.data?.message || "Failed to add to cart."}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Recommended For You</h2>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12">
        {categoryItems.length > 0 ? (
          categoryItems.map((item) => (
            <div key={item._id} className="card shadow-xl relative mr-5 md:my-5">
              <div
                className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
                  isHeartFilled ? "text-rose-500" : "text-white"
                }`}
                onClick={handleHeartClick}
              >
                <FaHeart className="w-5 h-5 cursor-pointer" />
              </div>
              <Link to={`/menu/${item._id}`}>
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="hover:scale-105 transition-all duration-300 md:h-72"
                  />
                </figure>
              </Link>
              <div className="card-body">
                <Link to={`/menu/${item._id}`}>
                  <h2 className="card-title">{item.name}</h2>
                </Link>
                <p>{item.category || "No category"}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <FaRupeeSign className="mr-1" />
                    <span className="text-md text-red font-semibold">
                      {item.price.toFixed(2)}
                    </span>
                  </div>
                  <button onClick={() => handleAddToCart(item)} className="btn bg-green text-white">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-20">
            <p>No suggested items found.</p>
            <Link to="/menu">
              <button className="btn bg-green text-white mt-3">Back to Menu</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommandPage;
