import React, { useEffect, useRef, useState } from 'react'
import { useActions, useAppSelector } from '../hooks/redux';
import { setUserChatsToFirebase } from '../firebase/chat.service';
import { onSnapshot } from 'firebase/firestore';
import { refChats } from '../firebase/refsDatabse';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IMessage } from '../types/message';
import ChatFooter from './ChatFooter';
import ChatMain from './ChatMain';
import ChatHeader from './ChatHeader';
import { IUser } from '../types/userType';
import { getUserFromFirebase } from '../firebase/user.service';
import { RoutePathEnam } from '../types/routeType';
import { setDataToLoacalSorage } from '../utils/localstorage';

const Chat: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<IMessage[]>([])
  const { usersId, chatId, chatName, chatImg } = useAppSelector(state => state.chat)
  const {setSelectedChat} = useActions()


  useEffect(() => {
    if (params.id === chatId) {
      const unsub = onSnapshot(refChats(chatId), async (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages)
        }else{
          setSelectedChat({
            chatId: '',
            chatImg: '',
            chatName: '',
            usersId: [],
          })        
          setMessages([])
        }
      });
      return () => {
        unsub()
      }
    } else {
      setDataToLoacalSorage('sC', '')
      navigate(RoutePathEnam.chats)
    }
  }, [usersId, chatId, chatName, chatImg])
  return (
    <div className='h100 flex flex-col border-l-2 bg-slate-300 border-blue-200 justify-between  w-full'>
      <ChatHeader usersId={usersId} chatId={chatId} chatName={chatName} ChatImg={chatImg} />
      <ChatMain messages={messages} />
      <ChatFooter usersId={usersId} chatId={chatId} />
    </div>
  )
}

export default Chat