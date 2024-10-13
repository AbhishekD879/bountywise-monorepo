'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  CalendarIcon,
  FileText,
  Tag,
  MessageSquare,
  Clock,
  X,
  Sparkles,
  Video,
  Mic,
  MessageCircle,
  Eye,
  Compass,
  PlusCircle
} from 'lucide-react'

// Assume this action is defined elsewhere and imported here
import { createBounty } from '@/app/actions'
import BountyAttachments from '../new-bounty/_component/BountyAttachments'
import CommingSoon from '@/components/ui/CommingSoon'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const tagOptions = [
  { value: 'legal', label: 'Legal', icon: '⚖️' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'marketing', label: 'Marketing', icon: '📢' }
]

export default function NewBountyForm() {
  const [state, formAction] = useFormState(createBounty, null)
  const [description, setDescription] = useState('') // The current text in the editor
  const [isTyping, setIsTyping] = useState(false) // To track if typing animation is happening
  const [typingText, setTypingText] = useState('') // The full text that will be typed out
  const [customTag, setCustomTag] = useState('')
  const [bountyTitle, setBountyTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)

  // Refs
  const titleRef = useRef<HTMLInputElement | null>(null)
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null)

  // Typing animation states for title
  const [isTypingTitle, setIsTypingTitle] = useState(false)
  const [typingTextTitle, setTypingTextTitle] = useState('')
  const typingSpeed = 20 // Typing speed in milliseconds
  // Typing effect for AI-generated text
  useEffect(() => {
    if (isTyping && typingText.length > 0) {
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < typingText.length) {
          setDescription((prev) => prev + typingText[currentIndex])
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTyping(false)
        }
      }, typingSpeed)

      return () => clearInterval(typeInterval)
    }
  }, [isTyping, typingText])

  // Typing effect for AI-generated title
  useEffect(() => {
    if (isTypingTitle && typingTextTitle.length > 0) {
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < typingTextTitle.length) {
          setBountyTitle((prev) => prev + typingTextTitle[currentIndex])
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setIsTypingTitle(false)
        }
      }, typingSpeed)

      return () => clearInterval(typeInterval)
    }
  }, [isTypingTitle, typingTextTitle])

  // Handle AI button click
  const handleAiDescriptionClick = async () => {
    console.log('Inside Ai Click')
    if (!bountyTitle) {
      alert('Please enter a bounty title before generating a description.')
      return
    }
    if (descriptionRef.current) {
      descriptionRef.current.disabled = true
    }
    const data = await fetch('/api/private/ms/ai/generateBountyDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: bountyTitle, description })
    })
    const aiGeneratedText = (await data.json()).description
    if (descriptionRef.current) {
      descriptionRef.current.disabled = false
    }
    setDescription('') // Reset description before starting typing
    setTypingText(aiGeneratedText) // Set the full text for typing
    setIsTyping(true) // Start the typing animation
  }

  // Handle AI title button click
  const handleAiTitleClick = async () => {
    if (!bountyTitle) {
      alert('Please enter a bounty title before generating a title.')
      return
    }
    if (titleRef.current) {
      titleRef.current.disabled = true
    }
    const data = await fetch('/api/private/ms/ai/rewriteBountyTitle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: bountyTitle })
    })
    const aiGeneratedTitle = (await data.json()).title
    if (titleRef.current) {
      titleRef.current.disabled = false
    }
    setBountyTitle('') // Reset title before starting typing
    setTypingTextTitle(aiGeneratedTitle) // Set the full title text for typing
    setIsTypingTitle(true) // Start the typing animation
  }

  const handleAddTag = (value: string) => {
    if (value && !tags.includes(value)) {
      setTags([...tags, value])
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags([...tags, customTag])
      setCustomTag('')
    }
  }

  if (state?.success) return <SuccessModel isOpen={state?.success} />

  return (
    <form action={formAction} className='flex h-full w-full flex-col space-y-2 py-3'>
      <div className='flex-grow space-y-3'>
        <div className='rounded-lg p-1 transition-all duration-300'>
          <Label htmlFor='title' className='flex items-center text-lg font-semibold text-[#46515e]'>
            <FileText className='mr-2 h-5 w-5 text-[#ff5722]' />
            Bounty Title
          </Label>
          <div className='relative'>
            <Input
              id='title'
              name='title'
              className='mt-1 w-full border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
              placeholder='e.g., Quick Legal Advice Needed'
              value={bountyTitle}
              onChange={(e) => setBountyTitle(e.target.value)}
              ref={titleRef}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type='button'
                    onClick={handleAiTitleClick}
                    className='absolute right-2 top-0 rounded-full bg-transparent p-1 text-[#ff5722] transition-all duration-300 hover:bg-[#ff57221a]'
                  >
                    <Sparkles className='h-5 w-5 animate-pulse' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>AI-powered title generation</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {state?.title && <p className='mt-1 text-sm text-[#d9534f]'>{state.title}</p>}
        </div>

        <div className='rounded-lg p-1 transition-all duration-300'>
          <Label htmlFor='description' className='flex items-center text-lg font-semibold text-[#46515e]'>
            <FileText className='mr-2 h-5 w-5 text-[#ff5722]' />
            Description
          </Label>
          <div className='relative mt-1'>
            <Textarea
              id='description'
              name='description'
              className='min-h-[200px] w-full border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
              placeholder='Provide a detailed description of your bounty...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              ref={descriptionRef}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type='button'
                    onClick={handleAiDescriptionClick}
                    className='absolute right-2 top-2 rounded-full bg-transparent p-1 text-[#ff5722] transition-all duration-300 hover:bg-[#ff57221a]'
                  >
                    <Sparkles className='h-5 w-5 animate-pulse' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>AI-powered Bounty Description generation</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {state?.description && <p className='mt-1 text-sm text-[#d9534f]'>{state.description}</p>}
        </div>

        <div className='rounded-lg p-1 transition-all duration-300'>
          <Label htmlFor='tags' className='flex items-center text-lg font-semibold text-[#46515e]'>
            <Tag className='mr-2 h-5 w-5 text-[#ff5722]' />
            Tags
          </Label>
          <div className='mt-1 flex flex-wrap gap-2'>
            <Select onValueChange={handleAddTag}>
              <SelectTrigger className='w-full border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722] md:w-auto'>
                <SelectValue placeholder='Select tags' />
              </SelectTrigger>
              <SelectContent>
                {tagOptions.map((tag) => (
                  <SelectItem key={tag.value} value={tag.value}>
                    <span className='flex items-center'>
                      <span className='mr-2'>{tag.icon}</span>
                      {tag.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='flex flex-1 gap-2'>
              <Input
                placeholder='Custom tag'
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className='flex-1 border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
              />
              <Button
                type='button'
                onClick={handleAddCustomTag}
                className='bg-[#ff5722] text-white transition-all duration-300 hover:bg-[#ff784e]'
              >
                Add
              </Button>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='animate-fadeIn flex items-center rounded-full bg-[#ff57221a] px-2 py-1 text-sm text-[#ff5722]'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => handleRemoveTag(tag)}
                  className='ml-2 text-[#ff5722] transition-colors duration-300 hover:text-[#d9534f]'
                >
                  <X className='h-3 w-3' />
                </button>
              </span>
            ))}
          </div>
          <input type='hidden' name='tags' value={tags.join(",")} />
          {state?.tags && <p className='mt-1 text-sm text-[#d9534f]'>{state.tags}</p>}
        </div>

        <div className='grid grid-cols-1 gap-6 align-middle md:grid-cols-2'>
          <div className='rounded-lg p-2 transition-all duration-300'>
            <Label className='flex items-center text-lg font-semibold text-[#46515e]'>
              <MessageSquare className='mr-2 h-5 w-5 text-[#ff5722]' />
              Preferred Communication Method
            </Label>
            <RadioGroup defaultValue='video' name='communicationMethod' className='mt-1 flex space-x-4'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='video' id='video' />
                <Label htmlFor='video' className='flex items-center'>
                  <Video className='mr-1 h-4 w-4' />
                  Video
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='audio' id='audio' />
                <Label htmlFor='audio' className='flex items-center'>
                  <Mic className='mr-1 h-4 w-4' />
                  Audio
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='chat' id='chat' />
                <Label htmlFor='chat' className='flex items-center'>
                  <MessageCircle className='mr-1 h-4 w-4' />
                  Chat
                </Label>
              </div>
            </RadioGroup>
            {state?.communicationMethod && <p className='mt-1 text-sm text-[#d9534f]'>{state.communicationMethod}</p>}
          </div>

          <div className='rounded-lg p-2 transition-all duration-300'>
            <Label htmlFor='deadline' className='flex items-center text-lg font-semibold text-[#46515e]'>
              <Clock className='mr-2 h-5 w-5 text-[#ff5722]' />
              Deadline (Optional)
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'mt-1 w-full justify-start text-left font-normal',
                    !deadline && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {deadline ? format(deadline, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={deadline} onSelect={setDeadline} initialFocus />
              </PopoverContent>
            </Popover>
            <input type='hidden' name='deadline' value={deadline ? deadline.toISOString() : ''} />
          </div>
        </div>

        {/* <div className="transition-all duration-300  p-1 rounded-lg">
          <Label htmlFor="budget" className="text-lg font-semibold text-[#46515e] flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-[#ff5722]" />
            Budget
          </Label>
          <div className="mt-1 relative">
            <Input
              id="budget"
              name="budget"
              type="number"
              min="0"
              step="0.01"
              className="pl-8 w-full border-[#d4d4d4] focus:ring-2 focus:ring-[#ff5722] transition-all duration-300"
              placeholder="Enter your budget"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          </div>
          {state?.budget && <p className="text-[#d9534f] text-sm mt-1">{state.budget}</p>}
        </div> */}

        <CommingSoon>
          <BountyAttachments />
        </CommingSoon>
      </div>

      <Button
        type='submit'
        className='group mt-6 w-full bg-[#ff5722] text-white transition-all duration-300 hover:bg-[#ff784e]'
      >
        Create Bounty
        <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
          →
        </span>
      </Button>
    </form>
  )
}

interface SuccessModelProps {
  isOpen: boolean
}

function SuccessModel({ isOpen }: SuccessModelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#303841] bg-opacity-70 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={() => setIsVisible(false)}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      <div
        className={`w-full max-w-2xl rounded-2xl bg-[#eeeeee] p-10 shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id='modal-title' className='mb-8 text-center text-3xl font-bold tracking-tight text-[#303841]'>
          Bounty Successfully Created!
        </h2>
        <div className='space-y-6'>
          <Link
            href='/private/new-bounty-v2'
            className='group flex w-full items-center justify-center rounded-lg bg-[#ff5722] px-6 py-4 text-[#ffffff] shadow-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg'
          >
            <PlusCircle className='mr-3 h-6 w-6' />
            <span className='text-lg font-semibold'>Create New Bounty</span>
            <span className='ml-3 inline-block transition-transform group-hover:translate-x-1'>→</span>
          </Link>
          <Link
            href='/bounties'
            className='group flex w-full items-center justify-center rounded-lg bg-[#46515e] px-6 py-4 text-[#ffffff] shadow-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg'
          >
            <Compass className='mr-3 h-6 w-6' />
            <span className='text-lg font-semibold'>Explore Bounties</span>
            <span className='ml-3 inline-block transition-transform group-hover:translate-x-1'>→</span>
          </Link>
          <Link
            href='/private/dashboard'
            className='group flex w-full items-center justify-center rounded-lg bg-[#303841] px-6 py-4 text-[#ffffff] shadow-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg'
          >
            <Eye className='mr-3 h-6 w-6' />
            <span className='text-lg font-semibold'>View Active Bounties</span>
            <span className='ml-3 inline-block transition-transform group-hover:translate-x-1'>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
