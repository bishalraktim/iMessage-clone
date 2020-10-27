import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { IconButton } from "@material-ui/core";
import Message from "./Message/Message";
import { useSelector } from "react-redux";
import { selectChatName, selectChatId } from "../../../features/chatSlice";
import dbs from "../../../Firebase/firebase";
import firebase from "firebase/app";
import { selectUser } from "../../../features/userSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef();
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      dbs
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    // firebase magic....
    dbs.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    scrollToBottom();
    setInput("");
  };
  return (
    <div className="chat">
      {/* chat header */}
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* chat messages */}

      <div className="chat__messages">
        <FlipMove>
          {messages.map((message) => (
            <Message key={message.id} contents={message.data} />
          ))}
        </FlipMove>
        <div ref={messagesEndRef} />
      </div>

      {/* chat input */}

      <div className="chat__input">
        <form>
          <input
            type="text"
            placeholder="iMessage"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!chatName}
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton className="chat__mic">
          <MicNoneIcon />
        </IconButton>
        <div />
      </div>
    </div>
  );
}

export default Chat;
