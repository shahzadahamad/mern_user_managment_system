import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios.js";
import Swal from "sweetalert2";
import { signOut } from "../../redex/admin/adminSlice.js";


function AdminHeader() {
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sign Out!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.get("auth/admin/signout");
          dispatch(signOut());
          Swal.fire({
            title: "Sign Out!",
            text: "Signing Out..",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <Link to="/admin/dashboard">
          <h1 className="font-bold">Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/admin/dashboard">
            <li>Dashboard</li>
          </Link>
          {currentAdmin ? (
            <li className="cursor-pointer" onClick={handleSignOut}>
              Sign Out
            </li>
          ) : (
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/admin/sign-in");
              }}
            >
              Sign In
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AdminHeader;
