import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from '../axios.js'
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../redex/user/userSlice.js";
import alert from "../sweetAlert.js";

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [error1, setError1] = useState(false);
  const [formData, setFormData] = useState({});
  const [imagePercentage, setImagePercentage] = useState(0);
  const dispatch = useDispatch();
  const { currentUser, loading , error } = useSelector((state) => state.user);


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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const hadnleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(`/user/update/${currentUser._id}`,formData);
      dispatch(updateUserSuccess(res.data));
      alert('success','User Updated!');
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={hadnleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="self-center text-sm">
          {error1 ? (
            <span className="text-red-700">
              Error uploading Image (file size less than 2 MB)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">
              {`Uploading ${imagePercentage}%`}
            </span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">Image Uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5 text-red-700 cursor-pointer">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">
        {
          error && 'something went wrong!'
        }
      </p>
    </div>
  );
}

export default Profile;
