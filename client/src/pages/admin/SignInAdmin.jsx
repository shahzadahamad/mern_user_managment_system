import axios from "../../axios.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess, signInAndUpClear } from "../../redex/admin/adminSlice.js";


function SignInAdmin() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fromData,setFormData] = useState({});
  const {error,loading} = useSelector((state) => state.admin);

  const handleChange = (e) => {
    dispatch(signInAndUpClear());
    setFormData({...fromData,[e.target.id] : e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post('/auth/admin/signin',fromData);
      dispatch(signInSuccess(res.data));
      navigate('/admin/dashboard');
    } catch (error) {
      dispatch(signInFailure(error.response.data));
    }
  }



  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Username"
          id="username"
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
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Loading..." : "Sign In"}</button>
      </form>
      {error ? (
        <p className="text-red-700 mt-5">{error.message || "something went wrong!"}</p>
      ) : (
        null
      )}
    </div>
  )
}

export default SignInAdmin
