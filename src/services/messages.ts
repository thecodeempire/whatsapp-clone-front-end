import { axiosGet, axiosPost } from "./axios";
import { IReqMessage, IResMessage } from "../types";

export async function getMessagesFromTo(
  from: string,
  to: string
): Promise<IResMessage[]> {
  try {
    const messages: IResMessage[] = await axiosGet(
      `/messages/get_from_to/${from}/${to}`
    );
    return messages;
  } catch (error) {
    throw new Error(`Error getting messages: ${error.message}`);
  }
}

export async function getMessageById(id: string): Promise<IResMessage> {
  try {
    const message: IResMessage = await axiosGet(`/messages/get/${id}`);
    return message;
  } catch (error) {
    throw new Error(`Error getting message: ${error.message}`);
  }
}

export async function updateMessageById(id: string): Promise<IResMessage> {
  try {
    const message: IResMessage = await axiosGet(`/messages/update_message/${id}`);
    return message;
  } catch (error) {
    throw new Error(`Error updating message: ${error.message}`);
  }
}

export async function updateMessagesByIds(ids: string[]): Promise<any> {
  try {
    const res: IResMessage = await axiosPost(`/messages/update`, { ids });
    return res;
  } catch (error) {
    throw new Error(`Error updating message: ${error.message}`);
  }
}

export async function createMessage(newMessage: IReqMessage): Promise<IResMessage> {
  try {
    const res: IResMessage = await axiosPost(`/messages/create`, newMessage);
    return res;
  } catch (error) {
    throw new Error(`Error updating message: ${error.message}`);
  }
}
