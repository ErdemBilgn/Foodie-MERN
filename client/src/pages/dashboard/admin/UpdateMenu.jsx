import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function UpdateMenu() {
  const item = useLoaderData();

  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;
  const imgbbApi = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    if (imageFile.image) {
      const hostingImg = await axiosPublic.post(imgbbApi, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (hostingImg.data.success) {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price),
          recipe: data.recipe,
          image: hostingImg.data.data.display_url,
        };

        const result = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
        if (result.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${item.name} has been updated successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/manage-items");
        }
      }
    } else {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
      };
      const result = await axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if (result.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${item.name} has been updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update This <span className="text-green">Menu Item</span>
      </h2>

      {/* Form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              defaultValue={item.name}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4 my-6">
            {/* Categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select A Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* Prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                defaultValue={item.price}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control my-6">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              defaultValue={item.recipe}
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Say something about the recipe"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image")}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMenu;
