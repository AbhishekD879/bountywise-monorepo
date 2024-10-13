// components/BountyCommunicationMethod.tsx (Client Component)
'use client'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { MessageSquare, Video, Mic } from 'lucide-react'
import { useState } from 'react'

export default function BountyCommunicationMethod({ error }: any) {
  const [communicationMethod, setCommunicationMethod] = useState<string>('video')
  return (
    <div className='mb-6'>
      <Label className='mb-2 flex items-center text-[#46515e]'>
        <MessageSquare className='mr-2' />
        Preferred Communication Method
      </Label>
      <RadioGroup
        name='communicationMethod'
        value={communicationMethod}
        onValueChange={setCommunicationMethod}
        className='flex space-x-4'
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='video' id='video' />
          <Label htmlFor='video' className='flex cursor-pointer items-center'>
            <Video className='mr-2' />
            Video
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='audio' id='audio' />
          <Label htmlFor='audio' className='flex cursor-pointer items-center'>
            <Mic className='mr-2' />
            Audio
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='chat' id='chat' />
          <Label htmlFor='chat' className='flex cursor-pointer items-center'>
            <MessageSquare className='mr-2' />
            Chat
          </Label>
        </div>
      </RadioGroup>
      {error && <p className='mt-1 text-sm text-[#d9534f]'>{error}</p>}
    </div>
  )
}
