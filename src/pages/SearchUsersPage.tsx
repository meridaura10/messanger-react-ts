import React, { useEffect, useState } from 'react'
import { useActions, useAppSelector } from '../hooks/redux'
import { getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { refChats, refUserChats } from '../firebase/refsDatabse'
import { uid } from 'uid'
import { createCombinedId } from '../utils/combinedId'
import { setUserChatsToFirebase } from '../firebase/chat.service'
import { useNavigate } from 'react-router-dom'
import { RoutePathEnam } from '../types/routeType'
import { getUserFromFirebase } from '../firebase/user.service'
import Avatar from 'react-avatar-edit'
import Modal from '../components/Modal'

const SearchUsersPage: React.FC = () => {
    const [value, setValue] = useState<string>('')
    const [nameValue, setNameValue] = useState<string>('')
    const [chatImg, setChatImg] = useState('')
    const { user } = useAppSelector(state => state.user)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])
    const { fetchUsersFromFirebase, setSelectedChat } = useActions()
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const { users, isLoading, error } = useAppSelector(state => state.users)
    const navigate = useNavigate()
    useEffect(() => {
        fetchUsersFromFirebase()
    }, [])
    if (!user) {
        return <></>
    }
    const createChat = async (e: React.FormEvent) => {
        e.preventDefault()
        const usersId = [...selectedUsers, user.id]
        if (selectedUsers.length > 1) {
            if (chatImg) {
                const chatId = uid()
                await setUserChatsToFirebase({
                    chatId,
                    chatName: nameValue,
                    usersId: usersId,
                    chatImg: chatImg,
                })
                setSelectedChat({
                    chatId,
                    chatImg: chatId,
                    chatName: nameValue,
                    usersId,
                })
                navigate(`${RoutePathEnam.chats}/${RoutePathEnam.chat}${chatId}`)
            } else {
                alert('select photo chat')
            }
        } else {

            const chatId = createCombinedId(usersId[0], usersId[1])
            const chatData = await getDoc(refChats(chatId))
            const userChat = await getUserFromFirebase(usersId.filter(id => id !== user.id)[0])
            if (chatData.exists()) {
                setSelectedChat({
                    chatId,
                    chatImg: userChat.img,
                    chatName: userChat.name,
                    usersId,
                })
                navigate(`${RoutePathEnam.chats}/${RoutePathEnam.chat}${chatId}`)
            } else {
                await setUserChatsToFirebase({
                    chatId,
                    chatName: null,
                    usersId,
                    chatImg: null,
                })
                setSelectedChat({
                    chatId,
                    chatImg: userChat.img,
                    chatName: userChat.name,
                    usersId,
                })
                navigate(`${RoutePathEnam.chats}/${RoutePathEnam.chat}${chatId}`)
            }
        }
    }
    const closeModal = () => {
        setIsShowModal(false)
    }

    return (
        <div className='w-full h100  py-5 max-w-[500px] mx-auto'>
            <div className='w-full px-2'>
                <div className='text-center font-bold text-xl py-1'>
                    messanger search users
                </div>
                <div className='w-full text-center'>
                    <input placeholder='search user to name' className='w-full max-w-[490px] outline-none px-3 py-2 border border-blue-200 focus:border-blue-400 transition-all' type="text" value={value} onChange={e => setValue(e.target.value)} />
                </div>
                {
                    isShowModal && <Modal headerText='create chat img' close={closeModal}>
                        <div className='flex justify-center'>
                            <Avatar
                                width={300}
                                height={300}
                                cropRadius={15}
                                onCrop={src => setChatImg(src)}
                            />
                        </div>
                        <div className='flex justify-center mt-2'>
                            {chatImg ? <img className='h-[65px] rounded-full w-[65px]' src={chatImg} alt="" /> : <div className='h-[65px] rounded-full w-[65px] bg-slate-300'></div>}
                        </div>
                        <div onClick={() => setIsShowModal(false)} className='flex justify-center py-5'>
                            <button className='bg-blue-600 text-white px-5 py-1.5 rounded-xl'>save</button>
                        </div>
                    </Modal>
                }
                <form onSubmit={createChat} >
                    <ul className='mt-2 max-h-[290px] overflow-y-auto'>
                        {

                            users.filter(e => e.id !== user.id).filter(user => user.name.toLowerCase().includes(value.toLowerCase())).map(user =>

                                <li key={user.id} className=' flex justify-between items-center hover:bg-slate-300 p-1 rounded-xl transition-all'>
                                    <div className='flex gap-1.5'>
                                        <div className='w-[50px] h-[50px]'>
                                            <img className='rounded-full w-full h-full' src={user.img} alt='userPhoto' />
                                        </div>
                                        <div className='flex flex-col gap2'>
                                            <div className='font-medium'>
                                                {user.name}
                                            </div>
                                            <div className='text-gray-600'>
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="radio">
                                        <input onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedUsers((prev) => [...prev, user.id])
                                            } else {
                                                setSelectedUsers((prev) => prev.filter(id => id !== user.id))
                                            }
                                        }} className="custom-radio" checked={!!selectedUsers.find(id => id === user.id)} type="checkbox" id={`user-${user.id}`} value="indigo" />
                                        <label htmlFor={`user-${user.id}`}></label>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                    {
                        selectedUsers.length > 1 && <div className='text-center mt-2 flex gap-3 items-center justify-center py-2'>
                            <div className='flex justify-center mt-2'>
                                {chatImg ? <img className='h-[65px] w-[65px]' src={chatImg} alt="" /> : <span onClick={() => setIsShowModal(true)} className=' cursor-pointer'>select a photo chat</span>}
                            </div>
                            <div>
                                <input required={true} placeholder='chat name' type="text" value={nameValue} onChange={e => setNameValue(e.target.value)} className='px-2 py-1 rounded-2xl border-none outline outline-blue-300 focus:outline-blue-500 transition-all' />
                            </div>
                        </div>
                    }
                    <div className='text-center mt-3'>
                        <button type='submit' className='px-3.5 rounded-3xl py-1.5 bg-blue-600 text-white'>create chat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchUsersPage