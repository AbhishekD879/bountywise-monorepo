import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bookmark, Clock } from 'lucide-react'
import BountyCardFooter from './BountyCardFooter'
import type {InferSelectModel} from "drizzle-orm"
import { bountyTable } from '@/schema'
import { format } from 'date-fns'

type BountyType = InferSelectModel<typeof bountyTable>
export default function BountyCard({budget,id,deadline,description,title,tags}:BountyType) {
  console.log(budget,id,deadline,description,title,tags)
  const deadlineDate = deadline? format(deadline, 'MMMM dd, yyyy') : 'No deadline set'
  return (
    <Card key={id} className='border-[#d4d4d4] bg-white'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-xl font-bold text-[#303841]'>
            {title}
          </CardTitle>
          <div className='flex items-center gap-2'>
            {budget && <Badge variant='secondary' className='bg-[#ff57221a] text-[#ff5722] flex items-center'>
              <span>{budget}</span>
            </Badge>}
            <Bookmark className='h-5 w-5 mr-2 cursor-pointer' />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='mb-4 line-clamp-2 text-[#46515e]'>
          {description}
        </p>
        <div className='mb-4 flex flex-wrap gap-2'>
          {tags && tags.map(tag=><Badge key={tag} variant='outline' className='bg-[#f8f9fa]'>
            {tag}
          </Badge>)}
        </div>
        <div className='flex items-center justify-between text-sm text-[#46515e]'>
          <div className='flex items-center space-x-2'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src='/placeholder-avatar.jpg' alt='User' />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center'>
              <Clock className='mr-1 h-4 w-4 text-[#46515e]' />
              <span>{deadlineDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <BountyCardFooter />
    </Card>
  )
}
