import { Timestamp, arrayUnion, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { refChats, refUserChats } from '../firebase/refsDatabse'
import { useAppSelector } from '../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { RoutePathEnam } from '../types/routeType'
import { uid } from 'uid'


interface ChatFooterProps {
    chatId: string,
    usersId: string[],
}


const ChatFooter: React.FC<ChatFooterProps> = ({
    chatId,
    usersId,
}) => {
    const [value, setValue] = useState<string>('')
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.user)
    const inputRef = useRef<HTMLInputElement>(null)


    const setMessage = async (e: React.FormEvent) => {
        if (user) {
            e.preventDefault()
            inputRef?.current?.focus()
            const text = value.replace(/\s+/g, ' ').trim()
            try {
                const message = {
                    text,
                    avtorId: user.id,
                    id: uid(),
                    date: Timestamp.now()
                }
                await updateDoc(refChats(chatId), {
                    messages: arrayUnion(message)
                });
                usersId.map(async (userId) => {
                    await updateDoc(refUserChats(userId), {
                        [chatId + ".date"]: serverTimestamp(),
                        [chatId + ".lastMessage"]: message,
                    });
                })
            } catch (error) {
                alert(`an error occurred while sending messages: ${error}`)
            }
            setValue('')
        } else {
            navigate(RoutePathEnam.login)
        }
    }

    return (
        <footer className='bg-slate-300 mt-2 h-[50px]'>
            <form className='relative w-full h-full' onSubmit={setMessage} >
                <div className='flex w-full justify-between px-5'>
                    <input ref={inputRef} placeholder='message...' type="text" className='px-3 py-1.5 rounded-xl outline border-none border w-full outline-blue-400 transition-all focus:outline-blue-600' value={value} onChange={e => setValue(e.target.value)} />
                    <button disabled={value.trim().length ? false : true} className='ml-3 bg-blue-700 disabled:opacity-70 transition-all text-white py-1 px-3 rounded-xl' type='submit'>send</button>
                </div>
            </form>
        </footer>
    )
}

export default ChatFooter