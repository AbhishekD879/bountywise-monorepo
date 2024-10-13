// components/BountyAttachments.tsx (Client Component)
'use client'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Paperclip, Upload, X } from 'lucide-react'

interface Attachment {
  file: File
  id: string
}

export default function BountyAttachments() {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e.target.files) {
      const newAttachments = Array.from(e.target.files).map((file) => ({
        file,
        id: Math.random().toString(36).substr(2, 9)
      }))
      setAttachments([...attachments, ...newAttachments])
    }
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  return (
    <div className='mb-6'>
      <Label htmlFor='attachment' className='mb-2 flex items-center text-[#46515e]'>
        <Paperclip className='mr-2' />
        Attachments (Optional)
      </Label>
      <div
        className='flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[#d4d4d4] p-4 text-center transition-all duration-300 hover:border-[#ff5722]'
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className='h-8 w-8 text-[#46515e]' />
        <p className='text-md mt-2 text-[#46515e]'>Click or drag files to upload</p>
        <Input
          id='attachment'
          type='file'
          onChange={handleFileChange}
          className='hidden'
          ref={fileInputRef}
          multiple
          name='attachments'
        />
      </div>
      {attachments.length > 0 && (
        <div className='mt-2 max-h-[200px] space-y-2 overflow-y-scroll bg-scroll'>
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
  )
}
