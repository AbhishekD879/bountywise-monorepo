import { Loader2, Award, Briefcase, Users, DollarSign } from 'lucide-react'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#303841] bg-opacity-90 backdrop-blur-sm'>
      <div className='flex w-full max-w-sm flex-col items-center rounded-lg bg-[#ffffff] p-8 shadow-lg'>
        <div className='relative mb-6 h-24 w-24'>
          <Loader2 className='h-24 w-24 animate-spin text-[#ff5722]' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <Image className='animate-scale' src='/logo.svg' alt='BountyWise' width={35} height={35} />
          </div>
        </div>
        <h2 className='mb-4 text-2xl font-bold text-[#303841]'>Loading BountyWise</h2>
        <p className='mb-6 text-center text-[#46515e]'>Preparing your content...</p>
        <div className='mb-6 flex justify-center space-x-8'>
          <div className='flex animate-bounce flex-col items-center' style={{ animationDelay: '0ms' }}>
            <Award className='h-8 w-8 text-[#ff5722]' />
            <span className='mt-1 text-xs text-[#303841]'>Quality</span>
          </div>
          <div className='flex animate-bounce flex-col items-center' style={{ animationDelay: '200ms' }}>
            <Briefcase className='h-8 w-8 text-[#ff5722]' />
          </div>
          <div className='flex animate-bounce flex-col items-center' style={{ animationDelay: '400ms' }}>
            <Users className='h-8 w-8 text-[#ff5722]' />
            <span className='mt-1 text-xs text-[#303841]'>Community</span>
          </div>
          <div className='flex animate-bounce flex-col items-center' style={{ animationDelay: '600ms' }}>
            <DollarSign className='h-8 w-8 text-[#ff5722]' />
            <span className='mt-1 text-xs text-[#303841]'>Rewards</span>
          </div>
        </div>
        <div className='mb-4 h-2 w-full rounded-full bg-[#eeeeee]'>
          <div className='h-2 animate-pulse rounded-full bg-[#ff5722]' style={{ width: '75%' }}></div>
        </div>
        <p className='text-sm text-[#46515e]'>This may take a few moments...</p>
      </div>
    </div>
  )
}
