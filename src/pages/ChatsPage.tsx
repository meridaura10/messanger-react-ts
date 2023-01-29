import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { useResize } from '../hooks/use-resize'
import { RoutePathEnam } from '../types/routeType'

const ChatsPage: React.FC = () => {
  const path = useLocation()
  const windowWidth = useResize()


  return (
    <div className='chats_page h100 flex'>
      {path.pathname.includes(RoutePathEnam.chat) ? windowWidth > 650 && <Navbar /> : <Navbar className={windowWidth < 500 ? 'max-w-[100%]' : ''} />}
      <Outlet />
    </div>
  )
}

export default ChatsPage