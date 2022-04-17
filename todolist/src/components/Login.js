import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();

const Login = () => {
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const user = result.user;
      console.log(user);
      // ...
    });
  };

  return (
    <div>
      <br />
      <button onClick={signInWithGoogle}>Google</button>
    </div>
  );
};

export default Login;
