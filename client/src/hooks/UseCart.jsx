import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function UseCart() {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/cart?email=${user?.email}`
      );
      return response.json();
    },
  });

  return [cart, refetch];
}

export default UseCart;
