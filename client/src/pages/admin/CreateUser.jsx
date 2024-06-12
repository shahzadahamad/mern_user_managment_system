import { useDispatch, useSelector } from "react-redux";
import {
  createUserStart,
  createUserSuccess,
  createUserFaliure,
  createUserClear,
} from "../../redex/admin/adminSlice.js";
import axios from "../../axios.js";
import alert from "../../sweetAlert.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);


  const handleChange = (e) => {
    dispatch(createUserClear());
    setFormData({ ...formData, [e.target.id]: e.target.value });
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createUserStart());
      await axios.post("/admin/create-user", formData);
      dispatch(createUserSuccess());
      navigate('/admin/dashboard');  
      alert("success", "User Created");
    } catch (error) {
      dispatch(createUserFaliure(error.response.data));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button 
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
        {error ? (
          <p className="text-red-700 mt-5">
            {error.message || "something went wrong!"}
          </p>
        ) : ''}
      </div>
    </div>
  );
}

export default CreateUser;
