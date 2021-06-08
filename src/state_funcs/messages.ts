import { getMessagesFromTo } from "../services/messages";
import { getAllUsers } from "../services/user";
import { IContextUser, IResUser } from "../types";

export const getUsersAndMessages = async () => {
  try {
    const users = await getAllUsers();
    const user: IResUser = JSON.parse(localStorage.getItem("user")!);
    const from = user._id;
    let newUsers: IContextUser[] = users.map((u) => {
      return {
        id: u._id,
        username: u.username,
        lastSeen: u.lastSeen,
        messages: [],
      };
    });
    const allPromises = newUsers.map((u) => {
      console.log(from, u.id)
      return getMessagesFromTo(from, u.id);
    });
    const resMessages = await Promise.all(allPromises);
    console.log(resMessages);
    resMessages.forEach((resMessage, i) => (newUsers[i].messages = resMessage));
    return newUsers;
  } catch (err) {
    console.error(err.message);
    throw new Error(err);
  }
};
