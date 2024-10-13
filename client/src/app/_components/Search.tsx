import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronRight } from 'lucide-react'

export default function Search() {
  return (
    <div className='w-full'>
      <form className='flex w-full gap-2'>
        <Input className='max-w-lg flex-1' placeholder='' type='email' />
        <Button type='submit'>
          Get Started
          <ChevronRight className='ml-2 h-4 w-4' />
        </Button>
      </form>
    </div>
  )
}
