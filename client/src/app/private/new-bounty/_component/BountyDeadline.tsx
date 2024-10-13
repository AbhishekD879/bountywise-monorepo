// components/BountyDeadline.tsx (Client Component)
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Clock, CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'

export default function BountyDeadline() {
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  return (
    <div className='mb-6'>
      <Label htmlFor='deadline' className='mb-2 flex items-center text-[#46515e]'>
        <Clock className='mr-2' />
        Deadline (Optional)
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={`w-full justify-start border-[#d4d4d4] text-left font-normal transition-all duration-300 focus:ring-2 focus:ring-[#ff5722] ${
              !deadline && 'text-muted-foreground'
            }`}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {deadline ? format(deadline, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' selected={deadline} onSelect={setDeadline} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}
