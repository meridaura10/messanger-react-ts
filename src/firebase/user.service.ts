import { getDoc } from "firebase/firestore";
import { refUser } from "./refsDatabse";
import { IUser } from "../types/userType";

export const getUserFromFirebase = async (userId: string) => {
  const user =  await getDoc(refUser(userId))
  return user.data() as IUser
};
