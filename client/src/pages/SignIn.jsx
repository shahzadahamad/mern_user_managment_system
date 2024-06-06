import { useState } from "react";
import axios from "../axios.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  signInAndUpClear,
} from "../redex/user/userSlice.js";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    // dispatch(signInAndUpClear());
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/auth/signin", formData);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.response.data));
    }
  };  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      {error ? (
        <p className="text-red-700 mt-5">{error.message || "something went wrong!"}</p>
      ) : (
        null
      )}
    </div>
  );
}

export default SignIn;
