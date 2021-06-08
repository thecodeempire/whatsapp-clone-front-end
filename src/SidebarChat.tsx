import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import { IContextUser } from "./types";

interface IProps {
  user: IContextUser;
  active: boolean;
  setCurrentUserId: (s: string) => void;
}

function SidebarChat({ user, active, setCurrentUserId }: IProps) {
  let lastMessage = "";
  if (user?.messages?.length > 0) {
    lastMessage = user.messages[user.messages.length - 1].message;
  }

  return (
    <div
      className={`sidebarChat ${active && "sidebarChat__active"}`}
      onClick={() => setCurrentUserId(user.id)}
    >
      <Avatar />
      <div className={`sidebarChat__info`}>
        <h3>{user.username}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
}

export default SidebarChat;
