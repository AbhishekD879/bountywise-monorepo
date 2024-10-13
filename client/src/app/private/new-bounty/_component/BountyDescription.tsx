'use client'
import { Label } from '@/components/ui/label'
import { FileText, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import MDEditor, { commands } from '@uiw/react-md-editor'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function BountyDescription({ error, bountyTitle }: any) {
  const [description, setDescription] = useState('') // The current text in the editor
  const [isTyping, setIsTyping] = useState(false) // To track if typing animation is happening
  const [typingText, setTypingText] = useState('') // The full text that will be typed out
  const [isEditorMode, setIsEditorMode] = useState(true) // To toggle between preview and editor mode
  const typingSpeed = 30 // Typing speed in milliseconds

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

  // Handle AI button click
  const handleAiClick = async () => {
    console.log('Inside Ai Click')
    if (!bountyTitle) {
      alert('Please enter a bounty title before generating a description.')
      return
    }
    const data = await fetch('/api/private/ms/ai/generateBountyDescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: bountyTitle, description })
    })
    const aiGeneratedText = (await data.json()).description

    setDescription('') // Reset description before starting typing
    setTypingText(aiGeneratedText) // Set the full text for typing
    setIsTyping(true) // Start the typing animation
  }

  return (
    <div className='mb-6'>
      <Label htmlFor='description' className='mb-2 flex items-center text-[#46515e]'>
        <FileText className='mr-2' />
        Description
      </Label>

      <div className='relative'>
        {/* Markdown Editor or Preview Mode */}
        <MDEditor
          value={description}
          onChange={(value) => setDescription(value || '')}
          height={300}
          data-color-mode='light'
          preview={isEditorMode ? 'edit' : 'preview'}
          onMouseLeave={() => setIsEditorMode(false)} // Switch to preview on mouse leave
          onMouseEnter={() => setIsEditorMode(true)}
          extraCommands={[
            commands.group([], {
              name: 'ai',
              keyCommand: 'ai',
              icon: (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Sparkles
                        size={20}
                        color='#d9534f'
                        className='animate-pulse cursor-pointer'
                        onClick={handleAiClick}
                      />
                    </TooltipTrigger>
                    <TooltipContent align='end' className='rounded-[0.5rem] border-none p-2 text-black'>
                      <p className='text-[#ff5722]'>Write With AI</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })
          ]}
        />
      </div>
      <textarea hidden={true} value={description} name='description' />
      <p className='mt-1 text-sm text-[#46515e]'>{description.length} characters</p>
      {error && <p className='mt-1 text-sm text-[#d9534f]'>{error}</p>}
    </div>
  )
}
