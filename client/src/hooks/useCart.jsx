import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6001";

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/carts?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch cart data");
      return res.json();
    },
  });

  return [cart, refetch];
};

export default useCart;
