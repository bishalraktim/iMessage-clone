import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auths, providers } from "../../../Firebase/firebase";

function Login() {
  const signIn = () => {
    auths.signInWithPopup(providers).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://images.macrumors.com/t/5a3wm8eTIaJUlzJ7qjZ8f85X31I=/400x0/filters:quality(90)/article-new/2018/06/imessage-logo-250x235.jpg?lossy"
          alt=""
        />
        <h1>iMessage</h1>
      </div>

      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;

