import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function PostBountySignPosting() {
  return (
    <Card className='bg-[#ff5722] text-white'>
      <CardContent className='flex flex-col items-center p-6 text-center'>
        <h3 className='mb-2 text-xl font-bold'>Ready to get started?</h3>
        <p className='mb-4'>Join our community and start earning or posting bounties today!</p>
        <Link className='w-full' href='/private/new-bounty-v2'>
          <Button variant='secondary' className='w-full bg-white text-[#ff5722] hover:bg-[#eeeeee]'>
            Post a Bounty
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
