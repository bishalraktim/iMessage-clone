import React, { useEffect } from "react";
import "./Imessage.css";
import Sidebar from "./Sidebar/Sidebar";
import Chat from "./Chat/Chat";

function Imessage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Imessage; 

