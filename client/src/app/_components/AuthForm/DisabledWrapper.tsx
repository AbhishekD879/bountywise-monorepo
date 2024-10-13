import { Ban } from 'lucide-react'

const DisabledWrapper = () => {
  return (
    <div className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center backdrop:blur-xl'>
      <Ban className='text-red-400' height='24' width='24' />
    </div>
  )
}

export default DisabledWrapper
