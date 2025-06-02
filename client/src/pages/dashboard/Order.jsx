import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

// ✅ Helper to safely get BASE_URL with fallback
const getBaseUrl = () => {
  return typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:6001";
};

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const BASE_URL = getBaseUrl();

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/payments?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
    enabled: !!user?.email,
  });

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  const totalPrice = orders.reduce((sum, order) => sum + (order.price || 0), 0);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16">
      <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
        <div className="py-28 flex flex-col items-center justify-center">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold leading-snug">
              Track All your <span className="text-green">Orders</span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        {orders.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-green text-white rounded-sm">
                  <tr>
                    <th>#</th>
                    <th>Order Date</th>
                    <th>Transaction ID</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-medium">{formatDate(item.createdAt)}</td>
                      <td>{item.transactionId || "N/A"}</td>
                      <td>{item.price}</td>
                      <td>{item.status}</td>
                      <td>
                        <Link
                          to="/contact"
                          className="btn btn-sm border-none text-red bg-transparent"
                        >
                          Contact
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr />

            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name: {user?.displayName || "None"}</p>
                <p>Email: {user?.email}</p>
                <p>
                  User ID: <span className="text-sm">{user?.uid}</span>
                </p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p>Total Items: {orders.length}</p>
                <p>Total Price: ₹{totalPrice}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mt-20">
            <p>No orders found.</p>
            <Link to="/menu">
              <button className="btn bg-green text-white mt-3">
                Back to Menu
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
