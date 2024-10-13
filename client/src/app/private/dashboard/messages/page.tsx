import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Page() {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-[#303841]'>Messages</h2>
      <Card className='border-none bg-[#ffffff] shadow-lg'>
        <CardContent className='p-6'>
          <div className='space-y-4'>
            {['John Doe', 'Jane Smith', 'Alice Johnson'].map((name, index) => (
              <div
                key={name}
                className='flex items-center space-x-4 rounded-lg bg-[#eeeeee] p-4 transition-colors hover:bg-[#d4d4d4]'
              >
                <Avatar className='h-12 w-12 border-2 border-[#ff5722]'>
                  <AvatarImage src='/placeholder.svg' />
                  <AvatarFallback className='bg-[#ff5722] text-[#ffffff]'>{name[0]}</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <h4 className='font-semibold text-[#303841]'>{name}</h4>
                  <p className='text-sm text-[#46515e]'>Latest message preview...</p>
                </div>
                <Badge variant='outline' className='border-[#ff5722] bg-[#ffffff] text-[#ff5722]'>
                  {index === 0 ? '2 new' : ''}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
