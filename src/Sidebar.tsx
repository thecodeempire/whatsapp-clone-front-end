import { IconButton, Avatar } from "@material-ui/core";
import {
  Chat as ChatIcon,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
import { IContextUser } from "./types";

const myProfilePic = "https://avatars.githubusercontent.com/u/18563948";

interface IProps {
  users: IContextUser[];
  currentUserId: string;
  setCurrentUserId: (s: string) => void;
}

function Sidebar({ users, currentUserId, setCurrentUserId }: IProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={myProfilePic} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
        <div className="sidebar__headerLeft"></div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        {users.map((u, i) => (
          <SidebarChat
            key={i}
            user={u}
            active={currentUserId === u.id}
            setCurrentUserId={setCurrentUserId}
          />
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
