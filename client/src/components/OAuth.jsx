import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../firebase";
import axios from "../axios.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redex/user/userSlice";


function OAuth() {
  const dispatch = useDispatch();
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
      console.log(res.data)
      dispatch(signInSuccess(res.data))
    } catch (error) {
      console.log(error.message);
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
