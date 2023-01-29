import { collection, doc, query } from "firebase/firestore"
import { db } from "."

export const refUser = (userId: string) =>{
   return doc(db, "users", userId)
}
export const refUserChats = (userId: string) =>{
   return doc(db, "userChats", userId)
}
export const refChats = (chatId: string) =>{
   return doc(db, "chats", chatId)
}
export const refCUsers = query(collection(db, "users"))