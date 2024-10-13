/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../reduxHooks'
import { authState, getUser, logout } from '../features/authSlice'
import { openAuthFormEvent } from '../eventListners/authFormListner'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const { user, loading, error } = useAppSelector(authState)
  const router = useRouter()
  const getCurrentUser = useCallback(() => {
    if (!user.id) {
      dispatch(getUser())
    }
  }, [dispatch])
  const logoutCurentUser = useCallback(() => {
    dispatch(logout())
    router.push('/')
  }, [dispatch])

  // useEffect(() => {
  //   if(!user.email){
  //     router.replace("/")
  //     setTimeout(()=>{
  //       document.dispatchEvent(openAuthFormEvent);
  //     },1000)
  //   }
  // }, [user.email]);

  return { user, loading, error, getCurrentUser, logoutCurentUser }
}
