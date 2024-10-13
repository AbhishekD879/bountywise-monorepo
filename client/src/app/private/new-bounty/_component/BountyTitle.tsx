// components/BountyTitle.tsx (Client Component)
'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText } from 'lucide-react'

export default function BountyTitle({ error, titleSetter }: any) {
  return (
    <div className='mb-6'>
      <Label htmlFor='title' className='mb-2 flex items-center text-[#46515e]'>
        <FileText className='mr-2' />
        Bounty Title
      </Label>
      <div>
        <Input
          id='title'
          name='title'
          onChange={(e) => {
            titleSetter(e.target.value)
          }}
          placeholder='e.g., Quick Legal Advice Needed'
          className='w-full border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
        />
      </div>
      {error && <p className='mt-1 text-sm text-[#d9534f]'>{error}</p>}
    </div>
  )
}
