import { axiosGet, axiosPost } from "./axios";
import { IResUser } from "../types";

export async function getAllUsers(): Promise<IResUser[]> {
  try {
    const users: IResUser[] = await axiosGet(`/users/get_all`);
    return users;
  } catch (err) {
    throw new Error(`Error getting all users: ${err.message}`);
  }
}

export async function updateUser({
  _id,
  username,
  lastSeen,
  image,
  email,
  officer,
}: IResUser) {
  try {
    const newUser: IResUser = await axiosPost(`/users/update`, {
      _id,
      username,
      lastSeen,
      image,
      email,
      officer
    });
    localStorage.setItem("user", JSON.stringify(newUser))
    return newUser;
  } catch (err) {
    throw new Error(`Error updating user: ${err.message}`);
  }
}
