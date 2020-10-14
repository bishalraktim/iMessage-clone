import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "./SidebarChat/SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import dbs, { auths } from "../../../Firebase/firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    dbs.collection("chats").onSnapshot((snapshot) => {
      // console.log("snapshot", snapshot);
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  //console.log("chats>>>", chats);

  const addChat = () => {
    const chatName = prompt("Please enter a chat name!");

    if (chatName) {
      dbs.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={user.photo}
          className="sidebar__avatar"
          onClick={() => auths.signOut()}
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input placeholder="search" />
        </div>
        <IconButton
          variant="outlined"
          className="slidebar__inputButton"
          onClick={addChat}
        >
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>

      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
