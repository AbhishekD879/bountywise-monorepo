// components/BountyFormLayout.tsx (Server Component)
import { ReactNode } from 'react'

export default function BountyFormLayout({ children, step }: { children: ReactNode; step: number }) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ff5722] to-[#ff9800] p-4'>
      <div className='w-full max-w-2xl transform rounded-lg bg-white p-8 shadow-2xl transition-all duration-500 ease-in-out'>
        <div className='mb-6 text-center'>
          <h2 className='text-3xl font-bold text-[#46515e]'>Create New Bounty</h2>
          <div className='mt-4 flex items-center justify-center'>
            <div
              className={`h-2 w-16 rounded-full transition-colors duration-300 ${step === 1 ? 'bg-[#ff5722]' : 'bg-[#d4d4d4]'}`}
            />
            <div
              className={`ml-2 h-2 w-16 rounded-full transition-colors duration-300 ${step === 2 ? 'bg-[#ff5722]' : 'bg-[#d4d4d4]'}`}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
