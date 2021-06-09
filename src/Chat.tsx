import { createRef } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  Search,
  MoreVert,
  AttachFile,
  InsertEmoticon,
  Send,
  MicRounded,
} from "@material-ui/icons";

import "./Chat.css";
import { createMessage } from "./services/messages";
import type { IResMessage, IResUser, IContextUser } from "./types";

interface IProps {
  messages: IResMessage[];
  currentUser?: IContextUser;
  setAuth: (v: boolean) => void;
}

function Chat({ messages, currentUser, setAuth }: IProps) {
  let eleRef = createRef<HTMLInputElement>();
  const localUser = localStorage.getItem("user");
  const authUser: IResUser =
    localUser != null ? JSON.parse(localUser) : setAuth(true);

  const sendMessage = (e: any) => {
    e.preventDefault();
    const message = eleRef?.current?.value;
    if (message != null && message?.length > 0) {
      if (currentUser != null) {
        const sender: IResUser = JSON.parse(localStorage.getItem("user")!)
        createMessage({
          to: currentUser.id,
          toName: currentUser.username,
          message,
          timestamp: "Just now!",
          officer: sender.officer
        })
          .then((res) => console.log(res))
          .catch((err) => {
            console.error(err.message);
          });
      }
    }
    if (eleRef?.current?.value != null) {
      eleRef.current.value = "";
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{currentUser?.username}</h3>
          <p>Last seen at....{currentUser?.lastSeen}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, i) => (
          <div key={i}>
            <p
              className={`chat__message ${
                message.from === authUser._id && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.fromName}</span>
              <span>{message.message}</span>
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <section>
          <input ref={eleRef} type="text" placeholder="Type a message..." />
          <IconButton onClick={sendMessage}>
            <Send />
          </IconButton>
          <IconButton>
            <MicRounded />
          </IconButton>
        </section>
      </div>
    </div>
  );
}

export default Chat;
