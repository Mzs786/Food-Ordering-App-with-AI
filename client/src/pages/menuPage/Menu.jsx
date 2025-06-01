import React, { useEffect, useState, useMemo, useCallback } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

// Constants
const ITEMS_PER_PAGE = 8;
const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "salad", label: "Salad" },
  { value: "pizza", label: "Pizza" },
  { value: "soups", label: "Soups" },
  { value: "dessert", label: "Desserts" },
  { value: "drinks", label: "Drinks" },
  { value: "south meals", label: "South Meals" },
  { value: "north meals", label: "North Meals" },
];

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Memoized filtered and sorted items
  const filteredItems = useMemo(() => {
    const filtered = selectedCategory === "all"
      ? menu
      : menu.filter(item => item.category === selectedCategory);
    
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "A-Z": return a.name.localeCompare(b.name);
        case "Z-A": return b.name.localeCompare(a.name);
        case "low-to-high": return a.price - b.price;
        case "high-to-low": return b.price - a.price;
        default: return 0;
      }
    });
  }, [menu, selectedCategory, sortOption]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Data fetching with abort controller
  useEffect(() => {
    const abortController = new AbortController();
    
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6001";
  
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/menu`, {
          signal: abortController.signal
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setMenu(data);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load menu. Please try again later.');
          console.error("Error fetching data:", err);
        }
      }
    };
  
    fetchData();
    return () => abortController.abort();
  }, []);
  

  // Handlers with useCallback
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((option) => {
    setSortOption(option);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Menu Banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
        <div className="py-48 flex flex-col items-center justify-center">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious <span className="text-green">Food</span>
            </h2>
            <p className="text-[#4A4A4A] text-xl md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food...
            </p>
            <Link to="/cart-page">
              <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="section-container">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* Category Filters */}
          <div className="flex flex-row justify-start md:items-center md:gap-4 gap-2 flex-wrap">
            {CATEGORIES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleCategoryChange(value)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === value
                    ? "bg-green text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="bg-black p-2 rounded-l">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-black text-white px-3 py-2 rounded-r focus:outline-none"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

// Extracted Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center my-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-full bg-gray-200 disabled:opacity-50"
      >
        &lt;
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-full ${
            currentPage === page ? "bg-green text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-full bg-gray-200 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Menu;