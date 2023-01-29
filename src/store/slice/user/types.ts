import { IUser } from "../../../types/userType";

export interface IUserState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: IUser | null;
}