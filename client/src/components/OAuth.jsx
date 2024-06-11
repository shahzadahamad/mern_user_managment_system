import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase";
import axios from "../axios.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redex/user/userSlice";
import { useNavigate } from "react-router-dom";



function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth,provider);
      const data = {
        name : result.user.displayName,
        email : result.user.email,
        photo : result.user.photoURL,
        }
      const res = await axios.post('/auth/google',data);
      console.log(res)
      dispatch(signInSuccess(res.data));
      navigate('/')
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}

export default OAuth;
