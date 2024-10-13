'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DollarSign, Send, Zap } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
export default function BountyCardFooter() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  return (
    <>
      <CardFooter className='flex justify-between border-t border-[#d4d4d4] pt-4'>
        <Link className='flex-1 mr-2' href="/testscreens/bountydetail">
          <Button variant='outline' className='w-full'>
            View Details
          </Button>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className='flex-1 bg-[#ff5722] text-white hover:bg-[#ff784e]'
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-[#303841] flex items-center gap-2 mb-2'>
              <Zap className='h-6 w-6 text-[#ff5722]' />
              <p className='text-2xl font-bold text-[#303841]'>Quick Apply</p>
            </DialogTitle>
            <DialogDescription className='text-[#46515e]'>Write A Short Message To Bounty Poster</DialogDescription>
          </DialogHeader>
          <QuotationSubmitionForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

const QuotationSubmitionForm = () => {
  return (
    <>
      <div className='grid gap-6 py-4'>
        <div className='grid gap-2'>
          <Label htmlFor='quote-type' className='text-[#303841] font-semibold'>
            Quote Type
          </Label>
          <RadioGroup defaultValue='perMinute' id='quote-type' className='flex space-x-4'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='perMinute' id='per-minute' />
              <Label htmlFor='per-minute' className='cursor-pointer'>
                Per Minute
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='overall' id='overall' />
              <Label htmlFor='overall' className='cursor-pointer'>
                Overall
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='quote-amount' className='text-[#303841] font-semibold'>
            Amount
          </Label>
          <div className='relative'>
            <DollarSign className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#46515e]' />
            <Input
              id='quote-amount'
              type='number'
              //   placeholder={quoteType === 'perMinute' ? 'Per minute rate' : 'Overall amount'}
              className='pl-10'
            />
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='message' className='text-[#303841] font-semibold'>
            Message (Optional)
          </Label>
          <Textarea id='message' placeholder='Write a brief message to the poster...' className='min-h-[100px]' />
        </div>
      </div>
      <DialogFooter className='sm:justify-start'>
        <Button
          type='submit'
          className='w-full bg-[#ff5722] text-white hover:bg-[#ff784e] transition-colors duration-200'
        >
          <Send className='mr-2 h-4 w-4' />
          Submit Application
        </Button>
      </DialogFooter>
    </>
  )
}
