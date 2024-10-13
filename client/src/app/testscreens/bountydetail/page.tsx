'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'

import {
  Calendar,
  Clock,
  DollarSign,
  MessageCircle,
  Paperclip,
  Tag,
  Zap,
  Eye,
  Users,
  AlertTriangle,
  ChevronRight,
  Bookmark,
  Share2,
  Star,
  ArrowLeft,
  Rocket,
  Target
} from 'lucide-react'
import Link from 'next/link'

// Mock data for the current bounty and similar bounties
const currentBounty = {
  id: '1',
  title: 'Need help with React component optimization',
  description:
    "Looking for an experienced React developer to help optimize the performance of a complex dashboard component. The ideal candidate should have a strong understanding of React's rendering lifecycle and experience with performance profiling tools.",
  tags: ['React', 'Performance', 'Frontend'],
  budget: 500,
  status: 'open',
  createdAt: new Date('2023-06-01'),
  deadline: new Date('2023-06-30'),
  communicationMethod: 'chat',
  attachments: ['dashboard_screenshot.png', 'performance_report.pdf'],
  poster: {
    name: 'John Doe',
    avatar: '/placeholder.svg?height=40&width=40',
    rating: 4.8
  }
}

const similarBounties = [
  { id: '2', title: 'React Native Performance Optimization', budget: 400, tags: ['React Native', 'Performance'] },
  { id: '3', title: 'Vue.js Component Refactoring', budget: 300, tags: ['Vue.js', 'Refactoring'] },
  { id: '4', title: 'Angular Application Speed Improvement', budget: 600, tags: ['Angular', 'Performance'] }
]

const topHunters = [
  { name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40', rating: 4.9 },
  { name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40', rating: 4.7 },
  { name: 'Carol Williams', avatar: '/placeholder.svg?height=40&width=40', rating: 4.8 }
]

export default function EnhancedBountyDetails() {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className='min-h-screen bg-[#eeeeee] p-4 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        <nav className='mb-6 flex items-center text-sm text-[#46515e]'>
          <Link href='/bounties' className='flex items-center hover:text-[#303841]'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Bounties
          </Link>
        </nav>

        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2 space-y-8'>
            <Card className='border-[#d4d4d4] shadow-lg overflow-hidden'>
              <CardHeader className='bg-white border-b border-[#d4d4d4] p-6'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                  <div>
                    <CardTitle className='text-2xl font-bold text-[#303841] mb-2 flex items-center'>
                      <Rocket className='mr-2 h-6 w-6 text-[#ff5722] animate-bounce' />
                      {currentBounty.title}
                    </CardTitle>
                    <div className='flex items-center text-sm text-[#46515e]'>
                      <Users className='mr-2 h-4 w-4' />
                      Posted by {currentBounty.poster.name}
                      <span className='mx-2'>•</span>
                      <Star className='mr-1 h-4 w-4 fill-current text-[#ff5722]' />
                      {currentBounty.poster.rating}
                    </div>
                  </div>
                  <div className='mt-4 md:mt-0'>
                    <Badge variant='secondary' className='bg-[#ff57221a] text-[#ff5722] text-lg font-bold px-3 py-1'>
                      ${currentBounty.budget}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='p-0'>
                <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
                  <TabsList className='grid w-full grid-cols-3 bg-[#eeeeee]'>
                    <TabsTrigger value='details' className='data-[state=active]:bg-white'>
                      Details
                    </TabsTrigger>
                    <TabsTrigger value='attachments' className='data-[state=active]:bg-white'>
                      Attachments
                    </TabsTrigger>
                    <TabsTrigger value='activity' className='data-[state=active]:bg-white'>
                      Activity
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value='details' className='p-6'>
                    <ScrollArea className='h-[400px] w-full rounded-md pr-4'>
                      <h3 className='text-lg font-semibold mb-2 text-[#303841] flex items-center'>
                        <Target className='mr-2 h-6 w-6 text-[#ff5722] animate-pulse-slow' />
                        Description
                      </h3>
                      <p className='text-[#46515e] mb-6'>{currentBounty.description}</p>
                      <h3 className='text-lg font-semibold mb-2 text-[#303841] flex items-center'>
                        <Tag className='mr-2 h-5 w-5 text-[#ff5722] animate-spin-slow' />
                        Tags
                      </h3>
                      <div className='flex flex-wrap gap-2 mb-6'>
                        {currentBounty.tags.map((tag) => (
                          <Badge key={tag} variant='secondary' className='bg-[#ff57221a] text-[#ff5722]'>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='flex items-center'>
                          <Calendar className='mr-2 h-4 w-4 text-[#ff5722]' />
                          <span className='text-sm text-[#46515e]'>
                            Posted: {format(currentBounty.createdAt, 'MMM d, yyyy')}
                          </span>
                        </div>
                        {currentBounty.deadline && (
                          <div className='flex items-center'>
                            <Clock className='mr-2 h-4 w-4 text-[#ff5722]' />
                            <span className='text-sm text-[#46515e]'>
                              Deadline: {format(currentBounty.deadline, 'MMM d, yyyy')}
                            </span>
                          </div>
                        )}
                        <div className='flex items-center'>
                          <MessageCircle className='mr-2 h-4 w-4 text-[#ff5722]' />
                          <span className='text-sm text-[#46515e]'>
                            Communication: {currentBounty.communicationMethod}
                          </span>
                        </div>
                        <div className='flex items-center'>
                          <Tag className='mr-2 h-4 w-4 text-[#ff5722]' />
                          <span className='text-sm text-[#46515e]'>Status: {currentBounty.status}</span>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value='attachments' className='p-6'>
                    <ScrollArea className='h-[400px] w-full rounded-md pr-4'>
                      <h3 className='text-lg font-semibold mb-4 text-[#303841]'>Attachments</h3>
                      {currentBounty.attachments.length > 0 ? (
                        <ul className='space-y-4'>
                          {currentBounty.attachments.map((attachment, index) => (
                            <li
                              key={index}
                              className='flex items-center p-3 bg-[#eeeeee] rounded-lg hover:bg-[#d4d4d4] transition-colors duration-200'
                            >
                              <Paperclip className='mr-3 h-5 w-5 text-[#ff5722]' />
                              <span className='flex-grow text-[#46515e]'>{attachment}</span>
                              <Button variant='outline' size='sm'>
                                Download
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className='text-[#46515e]'>No attachments available.</p>
                      )}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value='activity' className='p-6'>
                    <ScrollArea className='h-[400px] w-full rounded-md pr-4'>
                      <h3 className='text-lg font-semibold mb-4 text-[#303841]'>Activity</h3>
                      <div className='space-y-4'>
                        <div className='flex items-center p-3 bg-[#eeeeee] rounded-lg'>
                          <div className='w-10 h-10 rounded-full bg-[#ff57221a] flex items-center justify-center mr-3'>
                            <Users className='h-5 w-5 text-[#ff5722]' />
                          </div>
                          <div>
                            <p className='text-sm font-medium text-[#303841]'>New application received</p>
                            <p className='text-xs text-[#46515e]'>2 hours ago</p>
                          </div>
                        </div>
                        <div className='flex items-center p-3 bg-[#eeeeee] rounded-lg'>
                          <div className='w-10 h-10 rounded-full bg-[#ff57221a] flex items-center justify-center mr-3'>
                            <MessageCircle className='h-5 w-5 text-[#ff5722]' />
                          </div>
                          <div>
                            <p className='text-sm font-medium text-[#303841]'>New message from poster</p>
                            <p className='text-xs text-[#46515e]'>1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className='bg-[#eeeeee] p-4 flex justify-between items-center'>
                <div className='flex space-x-2'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant='outline' size='sm'>
                          <Bookmark className='h-4 w-4 mr-2' />
                          Save
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save this bounty for later</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant='outline' size='sm'>
                          <Share2 className='h-4 w-4 mr-2' />
                          Share
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share this bounty with others</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className='bg-[#ff5722] text-white hover:bg-[#ff784e] transition-colors duration-200'>
                        <Zap className='mr-2 h-4 w-4' />
                        Quick Apply
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Apply with your default profile and resume</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardFooter>
            </Card>

            <Card className='border-[#d4d4d4] shadow-lg'>
              <CardHeader>
                <CardTitle className='text-xl font-bold text-[#303841] flex items-center'>
                  <Zap className='mr-2 h-5 w-5 text-[#ff5722]' />
                  Similar Bounties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {similarBounties.map((bounty) => (
                    <div
                      key={bounty.id}
                      className='flex items-center justify-between p-4 border border-[#d4d4d4] rounded-lg hover:bg-[#eeeeee] transition-colors duration-200'
                    >
                      <div>
                        <h3 className='font-semibold text-[#303841]'>{bounty.title}</h3>
                        <div className='flex space-x-2 mt-2'>
                          {bounty.tags.map((tag) => (
                            <Badge key={tag} variant='secondary' className='bg-[#ff57221a] text-[#ff5722]'>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <span className='font-semibold text-[#ff5722]'>${bounty.budget}</span>
                        <Button variant='outline' size='sm' className='group'>
                          View
                          <ChevronRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className='space-y-8'>
            <Card className='border-[#d4d4d4] '>
              <CardHeader>
                <CardTitle className='text-xl font-bold text-[#303841] flex items-center'>
                  <Users className='mr-2 h-5 w-5 text-[#ff5722]' />
                  Bounty Poster
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex items-center space-x-4'>
                  <Avatar className='h-16 w-16 border-2 border-[#ff5722]'>
                    <AvatarImage src={currentBounty.poster.avatar} alt={currentBounty.poster.name} />
                    <AvatarFallback>{currentBounty.poster.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className='font-semibold text-[#303841]'>{currentBounty.poster.name}</h3>
                    <div className='flex items-center mt-1'>
                      <Star className='h-4 w-4 text-[#ff5722] fill-current' />
                      <span className='ml-1 text-sm text-[#46515e]'>{currentBounty.poster.rating}</span>
                    </div>
                    <p className='text-sm text-[#46515e]'>Member since 2022</p>
                  </div>
                </div>
                <Button className='w-full mt-4 bg-[#ff5722] text-white hover:bg-[#ff784e] transition-colors duration-200'>
                  <MessageCircle className='mr-2 h-4 w-4' />
                  Contact Poster
                </Button>
              </CardContent>
            </Card>

            <Card className='border-[#d4d4d4]'>
              <CardHeader>
                <CardTitle className='text-xl font-bold text-[#303841] flex items-center'>
                  <Eye className='mr-2 h-5 w-5 text-[#ff5722]' />
                  Bounty Stats
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-[#46515e] flex items-center'>
                      <Eye className='mr-2 h-4 w-4 text-[#ff5722]' />
                      Views
                    </span>
                    <span className='font-semibold text-[#303841]'>152</span>
                  </div>
                  <Progress value={60} className='h-2 bg-[#d4d4d4]' />
                </div>
                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-[#46515e] flex items-center'>
                      <Users className='mr-2 h-4 w-4 text-[#ff5722]' />
                      Applications
                    </span>
                    <span className='font-semibold text-[#303841]'>7</span>
                  </div>
                  <Progress value={35} className='h-2 bg-[#d4d4d4]' />
                </div>
                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-[#46515e] flex items-center'>
                      <Clock className='mr-2 h-4 w-4 text-[#ff5722]' />
                      Time Left
                    </span>
                    <span className='font-semibold text-[#303841]'>5 days</span>
                  </div>
                  <Progress value={75} className='h-2 bg-[#d4d4d4]' />
                </div>
              </CardContent>
            </Card>

            <Card className='border-[#d4d4d4]'>
              <CardHeader>
                <CardTitle className='text-xl font-bold text-[#303841] flex items-center'>
                  <Star className='mr-2 h-5 w-5 text-[#ff5722]' />
                  Top Hunters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topHunters.map((hunter, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-4 py-3 border-t border-[#d4d4d4] first:border-t-0 first:pt-0 last:pb-0'
                  >
                    <Avatar>
                      <AvatarImage src={hunter.avatar} alt={hunter.name} />
                      <AvatarFallback>{hunter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium text-[#303841]'>{hunter.name}</p>
                      <div className='flex items-center'>
                        <Star className='h-3 w-3 text-[#ff5722] fill-current' />
                        <span className='ml-1 text-xs text-[#46515e]'>{hunter.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className='border-[#d4d4d4] bg-gradient-to-br from-[#ff57221a] to-[#ff57223a]'>
              <CardHeader>
                <CardTitle className='text-xl font-bold text-[#303841] flex items-center'>
                  <AlertTriangle className='mr-2 h-5 w-5 text-[#ff5722]' />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-[#46515e] text-sm'>
                  Remember to communicate clearly and professionally with the bounty poster. If you have any issues,
                  please contact our support team.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
