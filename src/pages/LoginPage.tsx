import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';
import { useActions, useAppSelector } from '../hooks/redux';
import { setUserFromFirebase } from '../firebase/userService';
import { IUser } from '../types/userType';

const LoginPage: React.FC = () => {
  const [userIsLoading,setUserIsLoading] = useState(false)
  const { isLoading, error } = useAppSelector(state => state.user)
  const { setUser, setErrorUser } = useActions()
  const login = () => {
    setUserIsLoading(true)
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userData = result.user
        const user: IUser = {
          email: userData.email || '',
          id: userData.uid,
          img: userData.photoURL || '',
          name: userData.displayName || ''
        }
        await setUserFromFirebase(user)
        setUser(user)
        setUserIsLoading(false)
      }).catch((error) => {
        setErrorUser(JSON.stringify(error.message))
      });
  }
  return (
    <div className="flex bg-white items-center h100 justify-center">
      <div className='bg-slate-200 text-center shadow-sm rounded-xl  p-14'>
        {error && !isLoading 
          &&
          <p className='font-bold pb-2'>
            <span className='text-lg'>error: </span>
            {error}
          </p>
        }
        <button onClick={login} disabled={userIsLoading} className='px-4 bg-blue-600 disabled:bg-blue-400 transition-all rounded-2xl text-lg text-white py-3'>
          login with google
        </button>
      </div>
    </div>
  )
}

export default LoginPage