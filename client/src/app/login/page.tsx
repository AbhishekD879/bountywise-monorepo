'use client'

import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Dialog } from '@radix-ui/react-dialog'
import AuthForm from '../_components/AuthForm/AuthForm'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
export default function LoginPage() {
  const [open, setOpen] = useState<boolean>(true)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    if (!open && !user.email) {
      router.push('/')
    }
  }, [open, user.email, router])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogTitle>{''}</DialogTitle>
        <AuthForm
          isOpen={open}
          modelStateSetter={setOpen}
          modelProps={{
            isSignUpMode: false,
            redirectError: 'Oops! your session has expired or you are not logged in',
            redirectUrl: redirect
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
