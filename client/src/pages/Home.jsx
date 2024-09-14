import React, { useRef, useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Home = () => {
  const [loginState, setLoginState] = useState(false);
  const [signupState, setSignupState] = useState(false);
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  const loginHandle = () => {
    setLoginState(true);
    setSignupState(false);
    loginRef.current.style.background = "#c0e0ff";
    signupRef.current.style.background = "#fff";
  };
  const signupHandle = () => {
    setSignupState(true);
    setLoginState(false);
    signupRef.current.style.background = "#c0e0ff";
    loginRef.current.style.background = "#fff";
  };

  let option;

  if (loginState) {
    option = <Login />;
  } else if (signupState) {
    option = <Register />;
  } else {
    option = <Login />;
  }

  return (
    <div className="auth">
      <div className="auth_container">
        <h2>Chat Application</h2>

        <div className="form_wraper">
          <div className="button_wrap">
            <button
              className="login_button"
              ref={loginRef}
              onClick={loginHandle}
            >
              Login
            </button>
            <button ref={signupRef} onClick={signupHandle}>
              Sign Up
            </button>
          </div>
          {option}
        </div>
      </div>
    </div>
  );
};

export default Home;
