import { Video, Phone, MessageSquare, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { headers } from 'next/headers'

export default function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  let userType = searchParams.role || 'hunter'

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-[#303841]'>
          {userType === 'poster' ? 'My Bounties' : 'Available Bounties'}
        </h2>
        {userType === 'poster' && (
          <Button className='bg-[#ff5722] text-[#ffffff] hover:bg-[#ff5722]/90'>
            <Plus className='mr-2 h-5 w-5' /> Post New Bounty
          </Button>
        )}
      </div>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {['Web Development', 'Legal Consultation', 'Financial Analysis'].map((title, index) => (
          <Card key={title} className='border-none bg-[#ffffff] shadow-lg transition-shadow hover:shadow-xl'>
            <CardHeader className='rounded-t-lg bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]'>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                <Badge variant='secondary' className='bg-[#ffffff] text-[#ff5722]'>
                  Active
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className='pt-6'>
              <p className='text-3xl font-bold text-[#303841]'>${150 + index * 50}</p>
              <p className='text-sm text-[#46515e]'>Posted 2 hours ago</p>
              <div className='mt-4 flex items-center justify-between'>
                <div className='flex space-x-2'>
                  <Badge variant='outline' className='text-[#46515e]'>
                    <Video className='h-4 w-4' />
                  </Badge>
                  <Badge variant='outline' className='text-[#46515e]'>
                    <Phone className='h-4 w-4' />
                  </Badge>
                  <Badge variant='outline' className='text-[#46515e]'>
                    <MessageSquare className='h-4 w-4' />
                  </Badge>
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  className='border-[#ff5722] text-[#ff5722] hover:bg-[#ff5722] hover:text-[#ffffff]'
                >
                  {userType === 'poster' ? 'Edit' : 'Apply'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
