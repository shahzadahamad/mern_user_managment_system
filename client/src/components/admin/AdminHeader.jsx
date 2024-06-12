import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();
  const { currentAdmin } = useSelector((state) => state.admin);

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
            <li className="cursor-pointer">Sign Out</li>
          ) : (
            <li className="cursor-pointer"
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
