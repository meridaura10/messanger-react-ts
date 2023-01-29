import React, { FC, useEffect } from 'react'
import AppRoute from './AppRoute'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useActions,useAppSelector } from '../hooks/redux'

const App: FC = () => {
  const {isLoading} = useAppSelector(state => state.user)
  const {setUser} = useActions()
  useEffect(() => { 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email || '',
          id: user.uid,
          img: user.photoURL || '',
          name: user.displayName || ''
        })
      } else {
        setUser(null)
      }
    });
  }, [])

  return (
    !isLoading ? <AppRoute /> : <h1 className='text-center p-2 text-lg font-bold'>loading....</h1>
  )
}

export default App