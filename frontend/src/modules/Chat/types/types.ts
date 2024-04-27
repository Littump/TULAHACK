export interface IMessage {
  id: number;
  text: string;
  created: string;
  chat: number;
  my_id?: number;
  user: number;
}

export interface IChat {
  id: number;
  me: string;
  you: string;
  messages: IMessage[];
}
