import React, { useContext, useState, useCallback, memo } from "react";
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import useAxiosPublic from "../hooks/useAxiosPublic";
import PropTypes from "prop-types";

// Heart icon component
const HeartButton = ({ isFilled, onClick }) => (
  <button
    className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
      isFilled ? "text-rose-500" : "text-white"
    }`}
    onClick={onClick}
    aria-label={isFilled ? "Remove from favorites" : "Add to favorites"}
  >
    <FaHeart className="w-5 h-5 cursor-pointer transition-colors duration-200" />
  </button>
);

// Main card component
const Cards = memo(({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const [, refetch] = useCart();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Toggle favorite icon
  const handleHeartClick = useCallback(() => {
    setIsHeartFilled((prev) => !prev);
  }, []);

  // Show login alert if not logged in
  const showLoginAlert = useCallback(() => {
    Swal.fire({
      title: "Please login to order food",
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
  }, [navigate, location]);

  // Add to cart logic
  const handleAddToCart = useCallback(async () => {
    if (!user?.email) return showLoginAlert();

    const cartItem = {
      menuItemId: _id,
      name,
      quantity: 1,
      image,
      price,
      email: user.email,
    };

    try {
      setIsAddingToCart(true);

      const response = await axiosPublic.post("/carts", cartItem);

      if (response.status === 201) {
        await refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Item added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add item to cart";
      Swal.fire({
        position: "center",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsAddingToCart(false);
    }
  }, [user, _id, name, image, price, refetch, showLoginAlert, axiosPublic]);

  return (
    <article className="card shadow-xl relative mr-5 md:my-5 hover:shadow-2xl transition-shadow duration-300">
      <HeartButton isFilled={isHeartFilled} onClick={handleHeartClick} />

      <Link to={`/menu/${_id}`} className="block">
        <figure className="overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
          />
        </figure>
      </Link>

      <div className="card-body p-4">
        <Link to={`/menu/${_id}`} className="hover:text-green transition-colors">
          <h2 className="card-title text-lg font-bold truncate">{name}</h2>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{recipe}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-green font-bold">
            <FaRupeeSign className="mr-1" />
            <span>{parseFloat(price).toFixed(2)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="btn bg-green hover:bg-green-dark text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
});

// PropTypes validation
Cards.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    recipe: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards;
