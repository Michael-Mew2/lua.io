import * as React from "react";
// import {loginApi} from "../../api/api"
import {AuthContext} from "../../contextx/AuthContext"

// ----------
import { useNavigate } from "react-router-dom";

// -----------

export default function signInPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const {isLoggedIn, setIsLoggedIn, loginApi} = React.useContext(AuthContext);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const email = data.get("email")
    const password = data.get("password");
    // console.log({email}, {password});
    const user = await loginApi(email, password)
    if (user) {
      setIsLoggedIn(true)
      navigate("/members/dash")
      return;
    }
    
  }
  React.useEffect(()=> {
    // console.log("Is logged IN:", isLoggedIn);
    
  }, [isLoggedIn])
  return (
    <>
    hi
    </>
  );
}
