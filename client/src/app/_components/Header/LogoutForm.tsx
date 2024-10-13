'use client'
import { logout } from '@/app/actions'
import { useAuth } from '@/lib/hooks/useAuth'
import { LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'

export const LogoutForm = () => {
  const router = useRouter()
  const [state, logoutAction] = useFormState(logout, null)
  const { getCurrentUser, logoutCurentUser } = useAuth()

  useEffect(() => {
    console.log(state)
    if (state) {
      console.log('Logout Successful')
      logoutCurentUser()
      getCurrentUser()
      router.replace('/')
    }
  }, [state, getCurrentUser, logoutCurentUser, router])

  return (
    // <DropdownMenuItem className="cursor-pointer">
    <form
      className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
      action={logoutAction}
    >
      <button className='flex w-full items-center justify-start' type='submit'>
        <LogOut className='mr-2 h-4 w-4' />
        Log out
      </button>
    </form>
    // </DropdownMenuItem>
  )
}
