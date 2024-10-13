"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { CalendarIcon, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import React from 'react'
const categories = ['Legal', 'Finance', 'Tech', 'Design', 'Writing', 'Marketing']
const communicationMethods = ['Video', 'Audio', 'Chat']
export default function SearchBountites() {
  const [budgetRange, setBudgetRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
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

  return (
    <>
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

            <div>
              <Button className='w-full text-white bg-[#ff5722] hover:bg-[#ff784e]' onClick={toggleFilter}>
                Apply Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
