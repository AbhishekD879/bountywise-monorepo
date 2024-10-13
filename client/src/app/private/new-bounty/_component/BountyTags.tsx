// components/BountyTags.tsx (Client Component)
'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tag, X, HelpCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const tagOptions = [
  { value: 'legal', label: 'Legal', icon: '⚖️' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'writing', label: 'Writing', icon: '✍️' },
  { value: 'marketing', label: 'Marketing', icon: '📢' }
]

export default function BountyTags({ error }: { error: string[] | undefined }) {
  const [tags, setTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState('')

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
    setTags((prevTags: string[]) => prevTags.filter((tag: string) => tag !== tagToRemove))
  }

  return (
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
          type='button'
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
      <input type='hidden' name='tags' value={tags} />
      {error &&
        Array.isArray(error) &&
        error.map((er) => (
          <p key={er} className='mt-1 text-sm text-[#d9534f]'>
            {er}
          </p>
        ))}
    </div>
  )
}
