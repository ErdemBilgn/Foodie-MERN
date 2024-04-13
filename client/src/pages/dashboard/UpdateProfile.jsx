import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

function UpdateProfile() {
  const axiosPublic = useAxiosPublic();
  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
  const imgbbApi = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
  const { updateUserProfile, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const name = data.name;
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(imgbbApi, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (hostingImg) {
      updateUserProfile(name, hostingImg.data.data.display_url)
        .then(async () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Profile Updated!`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        })
        .catch((err) => {
          console.log(err);
          //An error occured
        });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold ">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            {/* <input
              {...register("image")}
              type="text"
              placeholder="photoURL"
              className="input input-bordered"
              required
            /> */}

            {/* TODO: IMAGE UPLOAD */}
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
