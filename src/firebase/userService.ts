import { setDoc } from "firebase/firestore";
import { IUser } from "../types/userType";
import { refUser, refUserChats } from "./refsDatabse";

export const setUserFromFirebase = async (user: IUser) => {
  await setDoc(refUserChats(user.id), {});
  await setDoc(refUser(user.id), user);
};
