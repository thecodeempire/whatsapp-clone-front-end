import { useState } from "react";
import { IconButton, Avatar, Button } from "@material-ui/core";
import { DonutLarge, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import "./Sidebar.css";
import Profile from "./Profile";
import { IContextUser } from "./types";
import { logout } from "./state_funcs/auth_state";

const myProfilePic = "https://avatars.githubusercontent.com/u/18563948";

interface IProps {
  users: IContextUser[];
  currentUserId: string;
  setCurrentUserId: (s: string) => void;
  setAuth: (v: boolean) => void;
}

function Sidebar({ setAuth, users, currentUserId, setCurrentUserId }: IProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => setModalOpen(false);
  const onClose = (_: object, __: string) => {
    console.log('......')
    setModalOpen(false);
  }

  return (
    <div className="sidebar">
      <Profile close={modalClose} open={modalOpen} onClose={onClose} />
      <div className="sidebar__header">
        <Button onClick={() => setModalOpen(true)}>
          <Avatar src={myProfilePic} />
        </Button>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <Button
            onClick={() => {
              logout();
              setAuth(true);
            }}
          >
            Logout
          </Button>
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
