import { ReactNode } from 'react'
import BountyWiseSidebar from './_components/BountywiseDashboardSidebar'
export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className='flex h-[calc(100%_-_76px)]'>
      <BountyWiseSidebar />
      <div className=' overflow-auto my-3 flex-1 mx-5'>{children}</div>
    </div>
  )
}
