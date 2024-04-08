import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import {
  FaUsers,
  FaShoppingBag,
  FaPlusCircle,
  FaEdit,
  FaRegUser,
  FaLocationArrow,
  FaQuestionCircle,
} from "react-icons/fa";

import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";
import UseAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaCartShopping /> Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow /> Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle /> Customer Support
      </Link>
    </li>
  </>
);

function DashboardLayout() {
  const { loading } = UseAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  return (
    <div>
      {isAdmin ? (
        <div>
          <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
              {/* Page content here */}
              <div className="flex items-center justify-between mx-4">
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  <MdDashboardCustomize />
                </label>
                <button className="btn bg-green text-white rounded-full flex items-center gap-2 px-6 sm:hidden">
                  <FaRegUser />
                  Logout
                </button>
              </div>
              <div className="mt-5 md:mt-2 mx-4">
                <Outlet />
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <Link to="/dashboard" className="flex justify-start mb-3">
                    <img src={logo} alt="" className="w-20" />
                    <span className="badge badge-primary">Admin</span>
                  </Link>
                </li>
                <hr />
                <li className="mt-3">
                  <Link to="/dashboard">
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaShoppingBag />
                    Manage Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/add-menu">
                    <FaPlusCircle />
                    Add Menu
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">
                    <FaEdit />
                    Manage Items
                  </Link>
                </li>
                <li className="mb-3">
                  <Link to="/dashboard/users">
                    <FaUsers />
                    All Users
                  </Link>
                </li>

                <hr />
                {/* Shared Nav Links*/}
                {sharedLinks}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Please login as an admin!!</p>
          <Link className="btn bg-green text-white rounded-full" to="/">
            Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
