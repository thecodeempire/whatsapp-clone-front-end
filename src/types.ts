export interface IReqMessage {
  to: string;
  toName: string;
  timestamp: string;
  message: string;
  officer?: boolean
}

export interface IResMessage {
  _id: string;
  to: string;
  toName: string;
  from: string;
  fromName: string;
  timestamp: string;
  message: string;
  received: boolean;
}

export interface IResUser {
  _id: string;
  username: string;
  lastSeen: string;
  token?: string;
  image?: string;
  email?: string;
  officer?: boolean;
}

export interface IContextUser {
  id: string;
  username: string;
  lastSeen: string;
  messages: IResMessage[];
  officer?: boolean;
}
