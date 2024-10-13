// components/CommingSoon.tsx
import React, { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils' // shadcn helper function for classnames
import { AlertCircle } from 'lucide-react'

interface CommingSoonProps {
  className?: string
  message?: string
}

const CommingSoon: React.FC<PropsWithChildren<CommingSoonProps>> = ({
  children,
  className,
  message = 'Coming Soon'
}) => {
  return (
    <div className='relative'>
      {/* Child component */}
      <div className='pointer-events-none opacity-50'>{children}</div>

      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 z-10 flex items-center justify-center rounded border border-[#969ba1] bg-transparent bg-opacity-50 p-2 font-bold text-white backdrop-blur-[1px]',
          className
        )}
      >
        <div className='absolute right-1 top-1 flex items-center gap-1'>
          <AlertCircle width={12} height={12} className='animate-pulse text-[#ff5722]' />
          <span className='text-sm font-bold text-[#969ba1]'>{message}</span>
        </div>
      </div>
    </div>
  )
}

export default CommingSoon
