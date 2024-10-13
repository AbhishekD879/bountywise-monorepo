'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CalendarIcon, Search, Filter, Star, ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

const categories = ['Legal', 'Finance', 'Tech', 'Design', 'Writing', 'Marketing']
const communicationMethods = ['Video', 'Audio', 'Chat']

export default function BountyListingScreen() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState([0, 1000])
  const [selectedCommunicationMethods, setSelectedCommunicationMethods] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const handleCommunicationMethodChange = (method: string) => {
    setSelectedCommunicationMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    )
  }

  const handleQuickApply = (bountyId: number) => {
    console.log(`Quick applied to bounty ${bountyId}`)
    // Here you would typically send the application to your backend
  }

  return (
    <div className='min-h-screen bg-[#f8f9fa] p-4 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        <nav className='mb-4 text-sm text-[#46515e]'>
          <Link href='/' className='hover:underline'>
            Home
          </Link>{' '}
          &gt; <span className='font-semibold'>Bounties</span>
        </nav>

        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <h1 className='mb-6 text-3xl font-bold text-[#303841]'>Explore Bounties</h1>

            <div className='mb-6 flex gap-4'>
              <div className='relative flex-grow'>
                <Input type='text' placeholder='Search bounties...' className='w-full border-[#d4d4d4] py-2 pl-10' />
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 transform text-[#46515e]' />
              </div>
              <Button onClick={toggleFilter} className='bg-[#ff5722] text-white hover:bg-[#ff784e]'>
                <Filter className='mr-2 h-4 w-4' />
                Filter
              </Button>
            </div>

            {isFilterOpen && (
              <Card className='mb-6 border-[#d4d4d4] bg-white'>
                <CardContent className='grid gap-4 p-4'>
                  <div>
                    <Label className='mb-2 block'>Categories</Label>
                    <div className='flex flex-wrap gap-2'>
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                          className='cursor-pointer'
                          onClick={() => handleCategoryChange(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className='mb-2 block'>Budget Range</Label>
                    <Slider
                      min={0}
                      max={1000}
                      step={10}
                      value={budgetRange}
                      onValueChange={setBudgetRange}
                      className='w-full'
                    />
                    <div className='mt-2 flex justify-between text-sm text-[#46515e]'>
                      <span>${budgetRange[0]}</span>
                      <span>${budgetRange[1]}</span>
                    </div>
                  </div>

                  <div>
                    <Label className='mb-2 block'>Communication Method</Label>
                    <div className='flex gap-4'>
                      {communicationMethods.map((method) => (
                        <div key={method} className='flex items-center'>
                          <Checkbox
                            id={method}
                            checked={selectedCommunicationMethods.includes(method)}
                            onCheckedChange={() => handleCommunicationMethodChange(method)}
                          />
                          <label
                            htmlFor={method}
                            className='ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                          >
                            {method}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className='mb-2 block'>Deadline Range</Label>
                    <div className='flex gap-4'>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant='outline' className='w-full justify-start text-left font-normal'>
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {dateRange.from ? format(dateRange.from, 'PPP') : <span>From date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={dateRange.from}
                            onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant='outline' className='w-full justify-start text-left font-normal'>
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {dateRange.to ? format(dateRange.to, 'PPP') : <span>To date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={dateRange.to}
                            onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className='space-y-4'>
              {[...Array(5)].map((_, index) => (
                <Card key={index} className='border-[#d4d4d4] bg-white'>
                  <CardHeader className='pb-2'>
                    <div className='flex items-start justify-between'>
                      <CardTitle className='text-xl font-bold text-[#303841]'>
                        Need help with React component optimization
                      </CardTitle>
                      <Badge variant='secondary' className='bg-[#ff57221a] text-[#ff5722]'>
                        $500
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 line-clamp-2 text-[#46515e]'>
                      Looking for an experienced React developer to help optimize the performance of a complex dashboard
                      component. The ideal candidate should have a strong understanding of React&apos;s rendering
                      lifecycle and experience with performance profiling tools.
                    </p>
                    <div className='mb-4 flex flex-wrap gap-2'>
                      <Badge variant='outline' className='bg-[#f8f9fa]'>
                        React
                      </Badge>
                      <Badge variant='outline' className='bg-[#f8f9fa]'>
                        Performance
                      </Badge>
                      <Badge variant='outline' className='bg-[#f8f9fa]'>
                        Frontend
                      </Badge>
                    </div>
                    <div className='flex items-center justify-between text-sm text-[#46515e]'>
                      <div className='flex items-center space-x-2'>
                        <Avatar className='h-6 w-6'>
                          <AvatarImage src='/placeholder-avatar.jpg' alt='User' />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span>John Doe</span>
                      </div>
                      <span>Deadline: 7 days</span>
                    </div>
                  </CardContent>
                  <CardFooter className='flex justify-between border-t border-[#d4d4d4] pt-4'>
                    <Button variant='outline' className='mr-2 flex-1'>
                      View Details
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            className='flex-1 bg-[#ff5722] text-white hover:bg-[#ff784e]'
                            onClick={() => handleQuickApply(index)}
                          >
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
              ))}
            </div>

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
          </div>

          <div className='space-y-4 lg:col-span-1'>
            <Card className='bg-[#ff5722] text-white'>
              <CardContent className='flex flex-col items-center p-6 text-center'>
                <h3 className='mb-2 text-xl font-bold'>Ready to get started?</h3>
                <p className='mb-4'>Join our community and start earning or posting bounties today!</p>
                <Button variant='secondary' className='w-full bg-white text-[#ff5722] hover:bg-[#eeeeee]'>
                  Post a Bounty
                </Button>
              </CardContent>
            </Card>
            <Card className='border-[#d4d4d4] bg-white'>
              <CardHeader>
                <CardTitle className='text-lg font-bold text-[#303841]'>Featured Bounties</CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className='border-t border-[#d4d4d4] p-4 first:border-t-0'>
                    <Badge className='mb-2 bg-[#ff5722] text-white'>Featured</Badge>
                    <h3 className='mb-2 text-base font-semibold text-[#303841]'>
                      Urgent: Legal advice needed for startup
                    </h3>
                    <p className='mb-2 text-sm text-[#46515e]'>Budget: $1000 - $1500</p>
                    <Button size='sm' variant='outline' className='w-full'>
                      View Details
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className='border-[#d4d4d4] bg-white'>
              <CardHeader>
                <CardTitle className='text-lg font-bold text-[#303841]'>Top Hunters</CardTitle>
              </CardHeader>
              <CardContent>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-4 border-t border-[#d4d4d4] py-2 first:border-t-0 first:pt-0 last:pb-0'
                  >
                    <Avatar>
                      <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} alt='Hunter' />
                      <AvatarFallback>H</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium text-[#303841]'>Hunter Name</p>
                      <div className='flex items-center'>
                        {[...Array(5)].map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`h-3 w-3 ${starIndex < 4 ? 'fill-[#ff5722] text-[#ff5722]' : 'text-[#d4d4d4]'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className='border-[#d4d4d4] bg-white'>
              <CardHeader>
                <CardTitle className='text-lg font-bold text-[#303841]'>Quick Filters</CardTitle>
              </CardHeader>
              <CardContent className='p-4'>
                {['High Budget Bounties', 'Urgent Bounties', 'Popular Categories'].map((filter) => (
                  <Button
                    key={filter}
                    variant='ghost'
                    className='mb-2 w-full justify-start text-[#303841] last:mb-0 hover:bg-[#ff57221a] hover:text-[#ff5722]'
                  >
                    {filter}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
