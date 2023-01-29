import { deleteDoc, deleteField, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react'
import { refChats, refUserChats } from '../firebase/refsDatabse';
import { useActions, useAppSelector } from '../hooks/redux';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePathEnam } from '../types/routeType';
import { setDataToLoacalSorage } from '../utils/localstorage';
import Arrrow from '../img/Arrrow';


interface ChatHeaderProps {
    ChatImg: string,
    chatName: string,
    chatId: string,
    usersId: string[],
}

const ChatHeader: FC<ChatHeaderProps> = ({
    ChatImg,
    chatName,
    usersId,
    chatId,
}) => {
    const navigate = useNavigate()
    const [isShowDrop, setIsShowDrop] = useState<boolean>(false)
    const { setSelectedChat } = useActions()
    const deleteChat = async () => {
        await deleteDoc(refChats(chatId));
        usersId.map(async (userId) => {
            await updateDoc(refUserChats(userId), {
                [chatId]: deleteField()
            });
        })
        setSelectedChat({
            chatId: '',
            chatImg: '',
            chatName: '',
            usersId: [],
        })
        navigate(RoutePathEnam.chats)
    }
    return (
        <header className='bg-slate-200 border-b  items-center flex justify-between px-5 border-blue-300 h-[50px]'>
            <Link to={RoutePathEnam.chats}>
                <Arrrow />
            </Link>
            <div className='flex cursor-pointer gap-1 items-center'>
                <img className='h-[40px] w-[40px] rounded-full' src={ChatImg} alt="photoUser" />
                <div className='font-bold'>
                    {chatName}
                </div>
            </div>
            <div onClick={() => setIsShowDrop(prev => !prev)} className="dropdown">
                <button className="dropbtn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            {
                isShowDrop && <div className='absolute p-1 bg-white shadow-md rounded-md right-[5px] top-[49px]'>
                    <button onClick={deleteChat} className='px-2 py-1'>delete</button>
                </div>
            }
        </header>
    )
}

export default ChatHeader