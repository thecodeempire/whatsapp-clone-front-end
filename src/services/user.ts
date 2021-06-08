import { axiosGet } from "./axios";
import { IResUser } from "../types";

export async function getAllUsers(): Promise<IResUser[]> {
  try {
    const users: IResUser[] = await axiosGet(`/users`);
    return users;
  } catch (err) {
    throw new Error(`Error getting all users: ${err.message}`);
  }
}
