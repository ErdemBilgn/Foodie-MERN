import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UseAuth from "../hooks/useAuth";
function Modal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signupWithGoogle, login } = UseAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const axiosPublic = useAxiosPublic();

  // redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    login(email, password)
      .then((result) => {
        const user = result.user;
        alert("login successfull!");
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        const errorMessage = err.message;
        setErrorMessage("Provide a correct email and password!");
      });
  };

  // google signin
  const handleGoogleLogin = () => {
    signupWithGoogle()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((response) => {
          document.getElementById("my_modal_5").close();
          alert("Signup successfull");
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action mt-0 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login!</h3>
            <div className="form-control">
              {/* Email */}
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Error Text */}
            {errorMessage ? (
              <p className="text-red text-xs italic">{errorMessage}</p>
            ) : (
              ""
            )}

            {/* Login Button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-green text-white"
              />
            </div>

            <p className="text-center my-2">
              Dont have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now!
              </Link>
            </p>
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          {/* Social Login */}
          <div className="text-center space-x-5 mb-5">
            <button
              className="btn btn-circle hover:bg-green hover:text-white"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-green hover:text-white">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
