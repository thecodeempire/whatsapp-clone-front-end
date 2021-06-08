import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
});

export async function axiosPost<R = unknown, A = any>(
  url: string,
  data: A
): Promise<R> {
  const res = await instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return res.data
}

export async function axiosGet<R = unknown>(url: string): Promise<R> {
  const res =await instance.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return res.data
}

export default instance;
