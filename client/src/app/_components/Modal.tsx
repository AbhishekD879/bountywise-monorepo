'use client'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useCreateAuthFormListner } from '@/lib/eventListners/authFormListner'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'

export function Modal({
  children,
  ModalComponent,
  modelProps
}: React.PropsWithChildren & {
  ModalComponent: React.ElementType
  modelProps?: any
}) {
  const [open, setOpen] = useState<boolean>(false)
  useCreateAuthFormListner(setOpen)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogTitle>{''}</DialogTitle>
        {<ModalComponent isOpen={open} modelStateSetter={setOpen} modelProps={modelProps} />}
      </DialogContent>
    </Dialog>
  )
}
