import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function AdminPubicRoute() {
  const { currentAdmin } = useSelector(state => state.admin);
  return currentAdmin ? <Navigate to="/admin/dashboard" /> : <Outlet />
}

export default AdminPubicRoute