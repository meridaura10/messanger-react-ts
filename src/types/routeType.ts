export interface IRoute {
    element: React.ReactNode,
    path: string,
    nestedRoute?: IRoute,
}
export enum RoutePathEnam {
    login = '/login',
    chats = '/chats',
    searchUsers = '/search/users',
    chat = 'chat/'
}