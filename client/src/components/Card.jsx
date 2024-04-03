import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import UseCart from "../hooks/UseCart";

function Card({ recipe }) {
  const [isHeartFillted, setIsHeartFillted] = useState(false);
  const { user } = useContext(AuthContext);

  const [cart, refetch] = UseCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAddToCart = (item) => {
    const { name, image, price, _id } = item;
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name: name,
        quantity: 1,
        image: image,
        price: price,
        email: user.email,
      };
      // console.log(cartItem);
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.menuItemId) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "The Item Has Been Added To The Cart!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please Login",
        text: "Without an account you can't be able to add product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFillted((currIsHeartFilled) => !currIsHeartFilled);
  };

  return (
    <div className="card 2xl:w-80 w-96 bg-base-100 shadow-xl relative">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFillted ? "text-rose-500" : "text-white"
        }`}
      >
        <FaHeart
          className="h-5 w-5 cursor-pointer"
          onClick={handleHeartClick}
        />
      </div>
      <Link to={`/menu/${recipe._id}`}>
        <figure>
          <img
            src={recipe.image}
            className="hover:scale-105 trainsition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${recipe._id}`}>
          <h2 className="card-title">{recipe.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span> {recipe.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddToCart(recipe)}
          >
            Add to Chart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
