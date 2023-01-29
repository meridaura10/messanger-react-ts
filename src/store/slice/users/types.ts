import { IUser } from "../../../types/userType";

export interface IUsersState {
    users: IUser[],
    isLoading: boolean,
    error: string,
}