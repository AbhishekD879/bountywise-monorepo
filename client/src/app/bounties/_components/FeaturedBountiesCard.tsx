import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function FeaturedBountiesCard() {
  return (
    <Card className='border-[#d4d4d4] bg-white'>
      <CardHeader>
        <CardTitle className='text-lg font-bold text-[#303841]'>Featured Bounties</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='border-t border-[#d4d4d4] p-4 first:border-t-0'>
            <Badge className='mb-2 bg-[#ff5722] text-white'>Featured</Badge>
            <h3 className='mb-2 text-base font-semibold text-[#303841]'>Urgent: Legal advice needed for startup</h3>
            <p className='mb-2 text-sm text-[#46515e]'>Budget: $1000 - $1500</p>
            <Button size='sm' variant='outline' className='w-full'>
              View Details
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
