import React, { useEffect } from "react";
import Imessage from "./components/iMessage/Imessage";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout, login } from "./features/userSlice";
import Login from "./components/iMessage/Login/Login";
import { auths } from "./Firebase/firebase";

function App() {
  const user = useSelector(selectUser);
  //console.log('user is ', user);
  const dispatch = useDispatch();

  useEffect(() => {
    auths.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <div className="app">{user ? <Imessage /> : <Login />}</div>;
}

export default App;
