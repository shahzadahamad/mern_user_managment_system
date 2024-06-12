import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoute() {
  const { currentAdmin } = useSelector(state => state.admin);
  return currentAdmin ? <Outlet /> : <Navigate to="/admin/sign-in" />
}

export default AdminPrivateRoute