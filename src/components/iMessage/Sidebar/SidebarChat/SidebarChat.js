import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setChat } from "../../../../features/chatSlice";
import dbs from "../../../../Firebase/firebase";
import moment from "moment";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    dbs
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  const sidebarClicked = () => {
    dispatch(
      setChat({
        chatId: id,
        chatName: chatName,
      })
    );
  };
 
  return (
    <div className="sidebarChat" onClick={sidebarClicked}>
      <Avatar src={chatInfo[0]?.photo} />
      <div className="sidebarChat__info">
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message.substring(0, 25) + " ...."}</p>
        <small>
          {moment(chatInfo[0]?.timestamp?.toDate())
            .startOf(chatInfo[0]?.timestamp?.seconds)
            .fromNow()}
          {/* {new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleString()} */}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;  
