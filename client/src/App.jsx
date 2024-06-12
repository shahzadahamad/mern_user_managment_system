import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";
import Error from "./components/error/Error";
import Header from "./components/user/Header";
import PrivateRoute from "./components/user/PrivateRoute";
import PublicRoute from "./components/user/PublicRoute";
import SignInAdmin from "./pages/admin/SignInAdmin";
import AdminHeader from "./components/admin/AdminHeader";
import Dashboard from "./pages/admin/Dashboard";
import EditUser from "./pages/admin/EditUser";
import CreateUser from "./pages/admin/CreateUser";
import AdminPrivateRoute from "./components/admin/AdminPrivateRoute";
import AdminPubicRoute from "./components/admin/AdminPubicRoute";

function App() {
  return (
    <BrowserRouter>
      {location.pathname.includes("/admin") ? <AdminHeader /> : <Header />}
      <Routes>
        {/* error route */}
        <Route path="*" element={<Error />} />
        {/* user routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* admin routes */}
        <Route element={<AdminPubicRoute />}>
          <Route path="/admin" element={<SignInAdmin />} />
          <Route path="/admin/sign-in" element={<SignInAdmin />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/edit-user" element={<EditUser />} />
          <Route path="/admin/create-user" element={<CreateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
