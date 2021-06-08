import { axiosPost } from "./axios";
import { IResUser } from "../types";

export async function register(username: string, password: string) {
  try {
    const resUser: IResUser = await axiosPost("/auth/register", {
      username,
      password,
    });
    localStorage.setItem("token", resUser.token);
    localStorage.setItem("user", JSON.stringify(resUser));
    return resUser.token;
  } catch (err) {
    throw new Error("Registration Error: " + err);
  }
}

export async function login(username: string, password: string) {
  try {
    const resUser: IResUser = await axiosPost("/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", resUser.token);
    localStorage.setItem("user", JSON.stringify(resUser));
    return resUser.token;
  } catch (err) {
    throw new Error("Registration Error: " + err);
  }
}

export async function getJWTTokenUsingRefreshToken() {
  try {
    const { token }: { token: string } = await axiosPost(
      "/auth/refresh_token",
      {
        refreshToken: localStorage.getItem("refreshToken"),
      }
    );
    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    throw new Error("Registration Error: " + err);
  }
}
