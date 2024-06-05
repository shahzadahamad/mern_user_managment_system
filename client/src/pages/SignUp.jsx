import { useState } from "react";
import axios from "../axios.js";
import { Link } from "react-router-dom";

function SignUp() {

  const [formData,setFormData] = useState({})
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await axios.post('/auth/signup',formData);
      console.log(res)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error.message)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange} 
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
           {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && 'something went wrong!'}</p>
    </div>
  );
}

export default SignUp;
