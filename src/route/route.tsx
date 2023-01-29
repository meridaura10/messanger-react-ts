import { Navigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import { IRoute, RoutePathEnam } from "../types/routeType"
import ChatsPage from "../pages/ChatsPage"
import Chat from "../components/Chat"
import SearchUsersPage from "../pages/SearchUsersPage"

export const privateRoute: IRoute[] = [
    {
        element: <ChatsPage />,
        path: RoutePathEnam.chats,
        nestedRoute: {
            element: <Chat />,
            path: `${RoutePathEnam.chat}:id`,
        },
    },
    {
        element: <SearchUsersPage />,
        path: RoutePathEnam.searchUsers
    },
    {
        element: <Navigate to={RoutePathEnam.chats} />,
        path: '*',
    },
]
export const publicRoutes: IRoute[] = [
    {
        element: <LoginPage />,
        path: RoutePathEnam.login,
    },
    {
        element: <Navigate to={RoutePathEnam.login} />,
        path: '*',
    },
]