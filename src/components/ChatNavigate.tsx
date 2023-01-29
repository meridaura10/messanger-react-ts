import React, { useEffect, useState } from 'react'
import { IUser } from '../types/userType'
import { NavLink, useNavigate } from 'react-router-dom'
import { RoutePathEnam } from '../types/routeType'
import { getUserFromFirebase } from '../firebase/user.service'
import { useActions, useAppSelector } from '../hooks/redux'
import ContentLoader from 'react-content-loader'
import { IChat } from '../types/chat'



const ChatNavigate: React.FC<IChat> = ({
    usersId,
    chatId,
    chatName,
    lastMessage,
    chatImg,
}) => {
    const { user } = useAppSelector(state => state.user)
    const [users, setUsers] = useState<IUser[]>([])
    const [usersLoading, setUsersLoading] = useState<boolean>(true)
    const { setSelectedChat } = useActions()
    const navigate = useNavigate()
    useEffect(() => {
        const usersIdChat = usersId.filter(userId => userId !== user?.id)
        const promiseUsers = [] as Promise<IUser>[]
        usersIdChat.map(async (userId: string) => {
            promiseUsers.push(getUserFromFirebase(userId))
        })
        Promise.all(promiseUsers).then(users => {
            setUsersLoading(false)
            setUsers(users)
        });
    }, [])
    if (!user) {
        navigate(RoutePathEnam.login)
        return <></>
    }
    const selectedChat = () => {
        setSelectedChat({
            chatId,
            chatName: users.length > 1 ? chatName : users[0].name,
            usersId,
            chatImg: users.length > 1 ?  chatImg: users[0].img,
        })
        navigate(RoutePathEnam.chat + chatId)
    }



    return (
        !usersLoading ? <div onClick={selectedChat} className='flex gap-1.5 hover:bg-slate-300 p-1 rounded-xl transition-all'>
            <div className='w-[50px] h-[50px]'>
                {users.filter(e => e.id !== user.id).length > 1
                    ? <img className='rounded-full w-full h-full' src={chatImg} alt='userPhoto' />
                    : <img className='rounded-full w-full h-full' src={users.filter(e => e.id !== user.id)[0]?.img} alt='userPhoto' />}
            </div>
            <div className='flex flex-col gap2'>
                <div className='font-medium'>
                    {users.filter(e => e.id !== user.id).length > 1 ? chatName : users.filter(e => e.id !== user.id)[0]?.name}
                </div>
                <div className='text-gray-600'>
                    {lastMessage ? lastMessage.text : 'no messages'}
                </div>
            </div>
        </div> : <ContentLoader
            className='px-1'
            speed={2}
            width={250}
            height={58}
            viewBox="0 0 250 58"
            backgroundColor="#d7c1c1"
            foregroundColor="#f2e3e3"
        >
            <rect x="54" y="32" rx="3" ry="3" width="52" height="5" />
            <circle cx="25" cy="25" r="25" />
            <rect x="56" y="9" rx="0" ry="0" width="82" height="7" />
        </ContentLoader>
    )
}

export default ChatNavigate