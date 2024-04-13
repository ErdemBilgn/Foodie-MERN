import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UseAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, signupWithGoogle } = UseAuth();

  const axiosPublic = useAxiosPublic();

  // redirecting to home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((response) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Welcome ${response.data.name}`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          });
        });
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(err);
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Welcome`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center my-40">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create An Account!</h3>
          <div className="form-control">
            {/* Name */}
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>
          <div className="form-control">
            {/* Email */}
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              className="input input-bordered"
              {...register("password")}
            />
          </div>

          {/* Error Text */}

          {/* Login Button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            Already have an account?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("my_modal_5").showModal();
              }}
              className="underline text-red ml-1"
            >
              Login Now!
            </button>
          </p>
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        {/* Social Login */}
        <div className="text-center space-x-5 mb-5">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-circle hover:bg-green hover:text-white"
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
      <Modal />
    </div>
  );
}

export default Signup;
