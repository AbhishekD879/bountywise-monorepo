import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'

const openAuthFormEventName = 'OPEN_AUTH_FORM'
const closeAuthEventName = 'CLOSE_AUTH_FORM'
export const openAuthFormEvent = new Event(openAuthFormEventName)
export const closeAuthFormEvent = new Event(closeAuthEventName)

export const useCreateAuthFormListner = (setFormState: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    function openAuthForm() {
      setFormState(true)
    }
    function closeAuthForm() {
      setFormState(false)
    }
    document.removeEventListener(openAuthFormEventName, openAuthForm)
    document.removeEventListener(closeAuthEventName, closeAuthForm)
    document.addEventListener(openAuthFormEventName, openAuthForm)
    document.addEventListener(closeAuthEventName, closeAuthForm)
  }, [setFormState])
}
