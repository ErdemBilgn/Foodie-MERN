import { useContext, useState } from "react";
import UseCart from "../../hooks/UseCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";

function Cart() {
  const [cart, refetch] = UseCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  //calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      alert("Item Cannot be 0");
      return;
    }
    fetch(`http://localhost:3000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity - 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
    refetch();
  };

  const handleIncrease = (item) => {
    // console.log(item._id);
    fetch(`http://localhost:3000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
    refetch();
  };

  //calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${item.name} is going to be deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/cart/${item._id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              refetch();
              Swal.fire({
                title: data.message,
                text: `${item.name} has been deleted.`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="section-container">
      {/* Banner */}
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          {/* Texts */}
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Add Items to The <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green text-white rounded-md">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td>
                    <button
                      className="btn btn-xs px-2"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={() => console.log(item.quantity)}
                      className="w-10 mx-2 text-center overflow-hidden appearance-none"
                    />
                    <button
                      className="btn btn-xs"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </td>
                  <td>$ {calculatePrice(item).toFixed(2)}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-ghost text-red btn-xs"
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer details */}
      <div className="my-24 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details:</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User Id: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Shopping Details:</h3>
          <p>Total Items: {cart.length} </p>
          <p>Total Price: ${orderTotal.toFixed(2)}</p>
          <button className="btn bg-green text-white">Proceed Checkout</button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
