import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import Profile from "./pages/user/Profile";
import Header from "./components/user/Header";
import PrivateRoute from "./components/user/PrivateRoute";
import PublicRoute from "./components/user/PublicRoute";
import SignInAdmin from "./pages/admin/SignInAdmin";
import AdminHeader from "./components/admin/AdminHeader";

function App() {
  return (
    <BrowserRouter>
      { location.pathname.includes("/admin") ? <AdminHeader /> : <Header />}
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path='/admin/sign-in' element={<SignInAdmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
