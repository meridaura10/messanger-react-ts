import React, { memo, useEffect, useState } from 'react'
import ChatNavigate from './ChatNavigate'
import { useActions, useAppSelector } from '../hooks/redux'
import { Link } from 'react-router-dom'
import { RoutePathEnam } from '../types/routeType'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { refUserChats } from '../firebase/refsDatabse'
import { IChat } from '../types/chat'
import { db } from '../firebase'

interface NavbarProps {
    className?: string,
}

const Navbar: React.FC<NavbarProps> = memo(({className}) => {
    const { user } = useAppSelector(state => state.user)
    const [chatsIsLoading, setChatsIsLoading] = useState<boolean>(true)
    const [chats, setChats] = useState<IChat[]>([])
    const [error, setError] = useState<string>('')
    useEffect(() => {
        if (user) {
            try {
                const onSub = onSnapshot(refUserChats(user.id), async (doc) => {
                    if (doc.exists()) {
                        const data = Object.entries(doc.data() as IChat)
                        const chats = data.map(chat => ({
                            ...chat[1],
                            chatId: chat[0]
                        }))
                        chats.sort((a, b) => b.date - a.date)
                        setChats(chats)
                    }
                    setChatsIsLoading(false)
                });

                return () => {
                    onSub()
                }
            } catch (error) {
                console.log(error);

                setError(JSON.stringify(error))
            }
        }
    }, [])


    return (
        <aside className={`min-w-[250px] w-full max-w-[250px]  h100 overflow-hidden flex flex-col justify-between bg-slate-200 shadow-xl ${className}`}>
            <div className='h__aside__content'>
                <div className='border-b h-[50px] mb-1 border-blue-300'>
                    <div className='flex  justify-between py-2 px-2'>
                        <div className='font-bold text-xl '>
                            messanger
                        </div>
                        <Link to={RoutePathEnam.searchUsers} className='plus'></Link>
                    </div>
                </div>
                {error && <p className='font-bold px-2 text-xl text-gray-900'>{error}</p>}
                {chatsIsLoading
                    ?
                    <p className='font-bold px-2 text-gray-700'>
                        chats loading...
                    </p>
                    :
                    chats.length > 0
                        ?
                        <div className='flex overflow-y-auto flex-col gap-2'>
                            {chats.map((chat) => <ChatNavigate
                                key={chat.chatId}
                                chatImg={chat.chatImg}
                                lastMessage={chat.lastMessage}
                                date={chat.date}
                                chatName={chat.chatName}
                                chatId={chat.chatId}
                                usersId={chat.usersId} />
                            )}
                        </div>
                        : <div className='px-2 text-center font-bold text-gray-600'>
                            you do not have chats to add them click on the plus
                        </div>
                }
            </div>
            {/* <div className='border-t-[1px] flex flex-col justify-center px-2 border-blue-300 h-[70px]'>
                <ChatNavigate user={user} />
            </div> */}
        </aside>
    )
})

export default Navbar