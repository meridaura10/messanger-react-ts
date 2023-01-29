import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { refCUsers } from "../../firebase/refsDatabse";
import { IUser } from "../../types/userType";

export const fetchUsersFromFirebase = createAsyncThunk<IUser[], undefined>(
  "users/fetchUsersFromFirebase",
  async (_) => {
    const response = await getDocs(refCUsers)
    return response.docs.map((user) => user.data() as IUser);
  }
);
