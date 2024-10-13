import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BountyPagination() {
  return (
    <div className='mt-8 flex justify-center space-x-2'>
      <Button variant='outline' size='icon' className='h-8 w-8 p-0'>
        <ChevronLeft className='h-4 w-4' />
        <span className='sr-only'>Previous page</span>
      </Button>
      {[1, 2, 3].map((page) => (
        <Button key={page} variant={page === 1 ? 'default' : 'outline'} size='icon' className='h-8 w-8 p-0'>
          {page}
        </Button>
      ))}
      <Button variant='outline' size='icon' className='h-8 w-8 p-0'>
        <ChevronRight className='h-4 w-4' />
        <span className='sr-only'>Next page</span>
      </Button>
    </div>
  )
}
