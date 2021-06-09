import { IResUser } from "../types";

import axios from "./axios";

export async function register({
  username,
  password,
  image,
  email,
}: {
  username: string;
  password: string;
  email: string;
  image?: string;
}) {
  try {
    const resUser: IResUser = await axios.post("/auth/register", {
      email,
      image,
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
    const resUser = await axios.post<IResUser>("/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", resUser.data.token);
    localStorage.setItem("user", JSON.stringify(resUser.data));
    return resUser.data.token;
  } catch (err) {
    throw new Error("Login Error: " + err.message);
  }
}

export async function getJWTTokenUsingRefreshToken() {
  try {
    const { token }: { token: string } = await axios.post(
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

export async function forgotPassword(username: string, password: string) {
  try {
    const res = await axios.post("/auth/forgot_password", { username, password });
    return res.data;
  } catch (err) {
    throw new Error("Forgot Password cannot be executed at this point");
  }
}
