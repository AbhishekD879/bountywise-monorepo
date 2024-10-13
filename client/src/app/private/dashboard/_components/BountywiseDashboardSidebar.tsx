// components/BountyWiseSidebar.tsx (Client Component)
'use client'
import { Zap, Home, Briefcase, MessageSquare, DollarSign, BarChart2, User } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
// import { headers } from "next/headers";

const sidebarItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Bounties', icon: Briefcase, path: '/my-bounties' },
  { name: 'Messages', icon: MessageSquare, path: '/messages' },
  { name: 'Payments', icon: DollarSign, path: '/payments' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' }
]

export default function BountyWiseSidebar() {
  const [pathname, setPathname] = useState(sidebarItems?.at(0)?.path)
  const [userType, setUserType] = useState<string>('poster')
  const router = useRouter()
  return (
    // hover:w-64
    <aside className='group flex w-16 flex-col items-center bg-[#303841] py-8 transition-all duration-300 hover:w-64'>
      <div className='mb-8 flex items-center justify-center'>
        <Zap className='w-10 h-10 text-[#ff5722]' />
        <span className='ml-4 hidden text-xl font-bold text-[#ffffff] group-hover:inline'>BountyWise</span>
      </div>
      <nav className='flex-1 w-full'>
        <ul className='space-y-4'>
          {sidebarItems.map((item) => (
            <li key={item.name} className='group/item'>
              <Link href={`/private/dashboard${item.path}`}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setPathname(item.path)}
                        className={`flex items-center w-full py-3 px-4 transition-colors ${
                          pathname === item.path
                            ? 'bg-[#ff5722] text-[#ffffff]'
                            : 'text-[#d4d4d4] hover:bg-[#46515e] hover:text-[#ffffff]'
                        }`}
                      >
                        <item.icon className='w-6 h-6' />
                        <span className='ml-4 hidden overflow-hidden whitespace-nowrap group-hover:inline'>
                          {item.name}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side='right' className='bg-[#303841] text-[#ffffff]'>
                      {item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {(pathname === '/' || pathname === '/my-bounties') && (
        <div className='mt-auto w-full px-4'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  className='w-full justify-start text-[#d4d4d4] hover:bg-[#46515e] hover:text-[#ffffff]'
                  onClick={() => {
                    // if (pathname === '/' || pathname === '/my-bounties') {
                    setUserType(userType === 'poster' ? 'hunter' : 'poster')
                    // revalidatePath(`/private/dashboard/${pathname}/${userType}`)
                    router.push(`/private/dashboard/${pathname}?role=${userType}`)
                    // }
                  }}
                >
                  <User className='w-6 h-6' />
                  <span className='ml-4 hidden group-hover:inline'>Switch View</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right' className='bg-[#303841] text-[#ffffff]'>
                Switch to {userType === 'poster' ? 'Poster' : 'Hunter'} View
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </aside>
  )
}
