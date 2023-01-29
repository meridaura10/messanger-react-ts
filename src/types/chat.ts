import { IMessage } from "./message";

export interface IChat {
  chatId: string;
  usersId: string[];
  chatName: string;
  chatImg: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  lastMessage: IMessage | null;
}
