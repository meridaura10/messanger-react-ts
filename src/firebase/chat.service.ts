import { serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { refChats, refUserChats } from "./refsDatabse";

export const setUserChatsToFirebase = async ({
  chatId,
  chatName,
  usersId,
  chatImg,
}: {
  chatId: string;
  chatName: string | null;
  usersId: string[];
  chatImg: string | null,
}) => {
 
    
  usersId.map(async (userId) => {
    await updateDoc(refUserChats(userId), {
      [chatId + ".usersId"]: usersId,
      [chatId + ".date"]: serverTimestamp(),
      [chatId + ".lastMessage"]: null,
      [chatId + ".chatName"]: chatName,
      [chatId + ".chatImg"]: chatImg,
      [chatId + ".id"]: chatId,
    });
  });
  await setDoc(refChats(chatId), {
    messages: [],
  });
};
