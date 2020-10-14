import React, { forwardRef } from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../../../../features/userSlice";
import { useSelector } from "react-redux";

const Message = forwardRef((props, ref) => {
  const user = useSelector(selectUser);

  return (
    <div
      ref={ref}
      className={`message ${
        props.contents.email === user.email && "message__sender"
      }`}
    >
      <Avatar className="message__photo" src={props.contents.photo} />
      <p>{props.contents.message}</p>
      <small>
        {new Date(props.contents.timestamp?.toDate()).toLocaleString()}
      </small>
    </div>
  );
}); 

export default Message;
