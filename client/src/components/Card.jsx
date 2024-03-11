import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function Card({ recipe }) {
  const [isHeartFillted, setIsHeartFillted] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFillted((currIsHeartFilled) => !currIsHeartFilled);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl relative">
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
          <button className="btn bg-green text-white">Add to Chart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
