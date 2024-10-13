import { LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { LogoutForm } from './LogoutForm'
import Link from 'next/link'
import Image from 'next/image'
export function ProfileDropdown({ url, firstName }: { url: string; firstName: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          loading='eager'
          placeholder='blur'
          blurDataURL={url}
          src={url || 'url'}
          alt={firstName || 'avatar'}
          width={40}
          height={40}
          className='rounded-full'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href='/private/dashboard'>
            <DropdownMenuItem className='cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <LogoutForm />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
