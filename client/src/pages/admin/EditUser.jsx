import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../firebase.js";
import axios from "../../axios.js";
import { useNavigate } from "react-router-dom";
import alert from "../../sweetAlert.js";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  selectUserEnd,
} from "../../redex/admin/adminSlice.js";

function EditUser() {
  const { selectedUser, error } = useSelector((state) => state.admin);
  const {username,email} = selectedUser;
  const [formData, setFormData] = useState({username,email});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [error1, setError1] = useState(false);
  const [imagePercentage, setImagePercentage] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      setError1(false);
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setError1(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const hadnleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
       await axios.post(
        `/admin/update-user/${selectedUser._id}`,
        formData
      );
      navigate("/admin/dashboard");
      dispatch(selectUserEnd(null));
      dispatch(updateUserSuccess());
      alert("success", "User Updated!");
    } catch (error) {
      dispatch(updateUserFailure(error.response.data));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit User</h2>
        <form onSubmit={hadnleSubmit}>
          <div className="flex justify-center mb-4">
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              id="userImage"
              src={formData.profilePicture || selectedUser.profilePicture}
              alt="User Image"
              className="rounded-full h-20 w-20 object-cover hover:cursor-pointer"
              onClick={() => fileRef.current.click()}
            />
          </div>
          <p className="self-center text-sm text-center">
            {error1 ? (
              <span className="text-red-700">
                Error uploading Image (file size less than 2 MB)
              </span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className="text-slate-700">
                {`Uploading ${imagePercentage}%`}
              </span>
            ) : imagePercentage === 100 ? (
              <span className="text-green-700">
                Image Uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              defaultValue={selectedUser.username}
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
              defaultValue={selectedUser.email}
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
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
          </div>
        </form>
        <p className="text-red-700 mt-5">
          {error ? error.message || "something went wrong!" : ""}
        </p>
      </div>
    </div>
  );
}

export default EditUser;
