import { Mail } from 'lucide-react'
import Link from 'next/link'

export default function HeaderMessages() {
  return (
    <Link href='/dashboard/messages'>
      <Mail className='h-6 w-6' />
    </Link>
  )
}
