'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  CalendarIcon,
  HelpCircle,
  X,
  Paperclip,
  Video,
  Mic,
  MessageSquare,
  DollarSign,
  Clock,
  Tag,
  FileText,
  ChevronRight,
  ChevronLeft,
  Upload
} from 'lucide-react'
import { format } from 'date-fns'

interface Attachment {
  file: File
  id: string
}

const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' }
]

const tagOptions = [
  { value: 'legal', label: 'Legal', icon: '⚖️' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'marketing', label: 'Marketing', icon: '📢' }
]

export default function NewBountyForm() {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState('')
  const [communicationMethod, setCommunicationMethod] = useState('chat')
  const [budget, setBudget] = useState<number | null>(null)
  const [currency, setCurrency] = useState(currencies[0])
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (description.length < 50) newErrors.description = 'Description must be at least 50 characters'
    if (tags.length === 0) newErrors.tags = 'Please select at least one tag'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!communicationMethod) newErrors.communicationMethod = 'Please select a communication method'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = () => {
    if (validateStep2()) {
      console.log('Form submitted:', {
        title,
        description,
        tags,
        communicationMethod,
        budget,
        currency,
        deadline,
        attachments
      })
      // Here you would typically send the data to your backend
    }
  }

  const handleAddTag = (value: string) => {
    if (value && !tags.includes(value)) {
      setTags([...tags, value])
    }
  }

  const handleAddCustomTag = () => {
    if (customTag && !tags.includes(customTag)) {
      setTags([...tags, customTag])
      setCustomTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9)
      }))
      setAttachments([...attachments, ...newAttachments])
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ff5722] to-[#ff9800] p-4'>
      <div className='w-full max-w-2xl transform rounded-lg bg-white p-8 shadow-2xl transition-all duration-500 ease-in-out'>
        <div className='mb-6 text-center'>
          <h2 className='text-3xl font-bold text-[#46515e]'>Create New Bounty</h2>
          <div className='mt-4 flex items-center justify-center'>
            <div
              className={`h-2 w-16 rounded-full transition-colors duration-300 ${step === 1 ? 'bg-[#ff5722]' : 'bg-[#d4d4d4]'}`}
            />
            <div
              className={`ml-2 h-2 w-16 rounded-full transition-colors duration-300 ${step === 2 ? 'bg-[#ff5722]' : 'bg-[#d4d4d4]'}`}
            />
          </div>
        </div>

        <div className={`transition-opacity duration-300 ${step === 1 ? 'opacity-100' : 'hidden opacity-0'}`}>
          <div className='mb-6'>
            <Label htmlFor='title' className='mb-2 flex items-center text-[#46515e]'>
              <FileText className='mr-2' />
              Bounty Title
            </Label>
            <Input
              id='title'
              placeholder='e.g., Quick Legal Advice Needed'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
            />
            {errors.title && <p className='mt-1 text-sm text-[#d9534f]'>{errors.title}</p>}
          </div>

          <div className='mb-6'>
            <Label htmlFor='description' className='mb-2 flex items-center text-[#46515e]'>
              <FileText className='mr-2' />
              Description
            </Label>
            <Textarea
              id='description'
              placeholder='Provide a detailed description of your problem...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='min-h-[150px] w-full border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
            />
            <p className='mt-1 text-sm text-[#46515e]'>{description.length}/500 characters</p>
            {errors.description && <p className='mt-1 text-sm text-[#d9534f]'>{errors.description}</p>}
          </div>

          <div className='mb-6'>
            <Label htmlFor='tags' className='mb-2 flex items-center text-[#46515e]'>
              <Tag className='mr-2' />
              Tags
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className='ml-2 inline-block h-4 w-4 cursor-help text-[#46515e]' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select relevant tags for your bounty</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Select onValueChange={handleAddTag}>
              <SelectTrigger className='w-full border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'>
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
            <div className='mt-2 flex items-center'>
              <Input
                placeholder='Add custom tag'
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className='mr-2 border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
              />
              <Button
                onClick={handleAddCustomTag}
                variant='outline'
                className='border-[#ff5722] text-[#ff5722] transition-all duration-300 hover:bg-[#ff57221a]'
              >
                Add
              </Button>
            </div>
            <div className='mt-2 flex flex-wrap gap-2'>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className='animate-fadeIn flex items-center rounded-full border border-[#ff5722] bg-[#ff57221a] px-2 py-1 text-sm text-[#ff5722]'
                >
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)} className='ml-2 text-[#ff5722]'>
                    <X className='h-3 w-3' />
                  </button>
                </span>
              ))}
            </div>
            {errors.tags && <p className='mt-1 text-sm text-[#d9534f]'>{errors.tags}</p>}
          </div>
        </div>

        <div className={`transition-opacity duration-300 ${step === 2 ? 'opacity-100' : 'hidden opacity-0'}`}>
          <div className='mb-6'>
            <Label className='mb-2 flex items-center text-[#46515e]'>
              <MessageSquare className='mr-2' />
              Preferred Communication Method
            </Label>
            <RadioGroup value={communicationMethod} onValueChange={setCommunicationMethod} className='flex space-x-4'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='video' id='video' />
                <Label htmlFor='video' className='flex cursor-pointer items-center'>
                  <Video className='mr-2' />
                  Video
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='audio' id='audio' />
                <Label htmlFor='audio' className='flex cursor-pointer items-center'>
                  <Mic className='mr-2' />
                  Audio
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='chat' id='chat' />
                <Label htmlFor='chat' className='flex cursor-pointer items-center'>
                  <MessageSquare className='mr-2' />
                  Chat
                </Label>
              </div>
            </RadioGroup>
            {errors.communicationMethod && <p className='mt-1 text-sm text-[#d9534f]'>{errors.communicationMethod}</p>}
          </div>

          <div className='mb-6'>
            <Label htmlFor='budget' className='mb-2 flex items-center text-[#46515e]'>
              <DollarSign className='mr-2' />
              Budget (Optional)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className='ml-2 inline-block h-4 w-4 cursor-help text-[#46515e]' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set your budget for this bounty</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className='flex items-center space-x-4'>
              <div className='flex flex-1 items-center'>
                <Select
                  value={currency.code}
                  onValueChange={(value) => setCurrency(currencies.find((c) => c.code === value) || currencies[0])}
                >
                  <SelectTrigger className='w-[80px] border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'>
                    <SelectValue placeholder='Currency' />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id='budget'
                  type='number'
                  value={budget === null ? '' : budget}
                  onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : null)}
                  className='ml-2 flex-1 border-[#d4d4d4] transition-all duration-300 focus:ring-2 focus:ring-[#ff5722]'
                  min={0}
                  max={1000000}
                  placeholder={`${currency.symbol}0.00`}
                />
              </div>
              <Slider
                value={budget !== null ? [budget] : [0]}
                onValueChange={(value) => setBudget(value[0])}
                max={1000}
                step={10}
                className='w-1/2'
                disabled={budget === null}
              />
            </div>
          </div>

          <div className='mb-6'>
            <Label htmlFor='deadline' className='mb-2 flex items-center text-[#46515e]'>
              <Clock className='mr-2' />
              Deadline (Optional)
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={`w-full justify-start border-[#d4d4d4] text-left font-normal transition-all duration-300 focus:ring-2 focus:ring-[#ff5722] ${!deadline && 'text-muted-foreground'}`}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {deadline ? format(deadline, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar mode='single' selected={deadline} onSelect={setDeadline} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className='mb-6'>
            <Label htmlFor='attachment' className='mb-2 flex items-center text-[#46515e]'>
              <Paperclip className='mr-2' />
              Attachments (Optional)
            </Label>
            <div
              className='cursor-pointer rounded-lg border-2 border-dashed border-[#d4d4d4] p-4 text-center transition-all duration-300 hover:border-[#ff5722]'
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className='mx-auto h-12 w-12 text-[#46515e]' />
              <p className='mt-2 text-sm text-[#46515e]'>Click or drag files to upload</p>
              <Input
                id='attachment'
                type='file'
                onChange={handleFileChange}
                className='hidden'
                ref={fileInputRef}
                multiple
              />
            </div>
            {attachments.length > 0 && (
              <div className='mt-2 space-y-2'>
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className='bg-gray-100 animate-fadeIn flex items-center justify-between rounded p-2'
                  >
                    <p className='text-sm text-[#46515e]'>
                      {attachment.file.name} ({(attachment.file.size / 1024).toFixed(2)} KB)
                    </p>
                    <Button
                      type='button'
                      variant='ghost'
                      onClick={() => handleRemoveAttachment(attachment.id)}
                      className='text-[#d9534f] transition-colors duration-300 hover:bg-[#d9534f]/10 hover:text-[#d9534f]'
                    >
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='mt-8 flex justify-between'>
          {step === 2 && (
            <Button
              onClick={() => setStep(1)}
              variant='outline'
              className='border-[#ff5722] text-[#ff5722] transition-all duration-300 hover:bg-[#ff57221a]'
            >
              <ChevronLeft className='mr-2 h-4 w-4' />
              Back
            </Button>
          )}
          {step === 1 ? (
            <Button
              onClick={handleNext}
              className='ml-auto bg-[#ff5722] text-white transition-all duration-300 hover:bg-[#ff784e]'
            >
              Next
              <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className='ml-auto bg-[#ff5722] text-white transition-all duration-300 hover:bg-[#ff784e]'
            >
              Post Bounty
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
