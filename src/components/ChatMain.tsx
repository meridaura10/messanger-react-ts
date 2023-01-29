import React, { FC, useEffect, useRef } from 'react'
import { IMessage } from '../types/message'
import { useAppSelector } from '../hooks/redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { RoutePathEnam } from '../types/routeType'

interface ChatMainProps {
    messages: IMessage[]
}

const ChatMain: FC<ChatMainProps> = ({
    messages
}) => {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const refChat = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (refChat.current) {
            const scrollHeight = refChat.current.scrollHeight
            refChat.current.scrollTop = scrollHeight
        }
    }, [messages])
    if (!user) {
        navigate(RoutePathEnam.login)
        return <></>
    }
    return (
        <div ref={refChat} className='bg-slate-300 h_chat__content overflow-y-auto py-2'>
            <ul className='py-2 max-w-[95%] w-full mx-auto flex flex-col gap-2 '>
                {messages.map(mes =>
                    <li
                        key={mes.id}
                        className={
                            `px-4 py-2 max-w-[260px] break-words overflow-hidden bg-white rounded-xl 
                        ${mes.avtorId === user.id ? 'self-end text-white bg-green-600' : 'self-start'}`
                        }
                    >
                        {mes.text}
                    </li>)}
            </ul>
        </div>
    )
}

export default ChatMain