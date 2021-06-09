import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher, { Channel } from "pusher-js";
import "./Home.css";
import type { IContextUser, IResMessage, IResUser } from "./types";
import { getUsersAndMessages } from "./state_funcs/messages_state";
interface IProps {
  setAuth: (val: boolean) => void;
}
function Home({ setAuth }: IProps) {
  const [users, setUsers] = useState<IContextUser[]>([]);
  const [err, setErr] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState("");

  function addError(err: string) {
    setErr(err);
    setTimeout(() => {
      setErr("");
    }, 5000);
  }

  useEffect(() => {
    getUsersAndMessages()
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          setAuth(true);
        } else {
          addError(error);
        }
      });
  }, [setUsers, setAuth]);

  useEffect(() => {
    const pusher = new Pusher("92227230285a5ac11574", {
      cluster: "ap2",
    });
    const authUser: IResUser = JSON.parse(localStorage.getItem("user")!);
    const ids: string[] = [];
    users.forEach((u) => {
      users.forEach((u2) => {
        if (u.id !== u2.id) {
          ids.push(u.id + "__" + u2.id);
        }
      });
      ids.push(`${authUser._id}__${u.id}`);
      ids.push(`${u.id}__${authUser._id}`);
    });
    const channels: Channel[] = [];
    ids.forEach((id) => channels.push(pusher.subscribe(id)));
    channels.forEach((channel) =>
      channel.bind("inserted", (newMessage: IResMessage) => {
        setUsers(
          users.map((u) => {
            if (u.id === newMessage.from || u.id === newMessage.to) {
              return { ...u, messages: [...u.messages, newMessage] };
            }
            return u;
          })
        );
      })
    );

    return () => {
      channels.forEach((channel) => {
        channel.unbind_all();
        channel.unsubscribe();
      });
    };
  }, [users]);

  const currentUser: IContextUser | undefined = users.find(
    (u) => u.id === currentUserId
  );
  const messages: IResMessage[] | undefined = currentUser?.messages;

  return (
    <div className="home">
      <div className="home__body">
        <Sidebar
          setAuth={setAuth}
          users={users}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
        />
        <Chat
          messages={messages ?? []}
          currentUser={currentUser}
          setAuth={setAuth}
        />
      </div>
      {err.length > 0 ? <div className="home__error">{err}</div> : null}
    </div>
  );
}

export default Home;
