// components/NewBountyForm.tsx (Client Component)
'use client'

import { useState } from 'react'
import BountyFormLayout from './BountyFormLayout'
import BountyTitle from './BountyTitle'
import BountyDescription from './BountyDescription'
import BountyTags from './BountyTags'
import BountyCommunicationMethod from './BountyCommunicationMethod'
import BountyAttachments from './BountyAttachments'
import BountyDeadline from './BountyDeadline'
import BountyStepNavigation from './BountyStepNavigation'

interface Attachment {
  file: File
  id: string
}

export default function NewBountyForm() {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [communicationMethod, setCommunicationMethod] = useState('chat')
  const [deadline, setDeadline] = useState<Date | undefined>()
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation for step 1 (title, description, and tags)
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Title is required'
    if (description.length < 50) newErrors.description = 'Description must be at least 50 characters'
    if (tags.length === 0) newErrors.tags = 'Please select at least one tag'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validation for step 2 (communication method)
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    if (!communicationMethod) newErrors.communicationMethod = 'Please select a communication method'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle the "Next" button click to proceed to the next step
  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  // Handle the form submission
  const handleSubmit = async () => {
    const res = await fetch('/api/private/ms/bounty/create-bounty', {
      credentials: 'include'
    })
    console.log('res:', res)
    if (validateStep2()) {
      console.log('Form submitted:', {
        title,
        description,
        tags,
        communicationMethod,
        deadline,
        attachments
      })
      // Place logic to submit form data to the server here
    }
  }

  // return (

  //     <BountyFormLayout step={step}>
  //       {/* Step 1: Title, Description, and Tags */}
  //       <div
  //         className={`transition-opacity duration-300 ${
  //           step === 1 ? "opacity-100" : "opacity-0 hidden"
  //         }`}
  //       >
  //         <BountyTitle title={title} setTitle={setTitle} error={errors.title} />
  //         <BountyDescription
  //           description={description}
  //           setDescription={setDescription}
  //           error={errors.description}
  //         />
  //         <BountyTags tags={tags} setTags={setTags} error={errors.tags} />
  //       </div>

  //       {/* Step 2: Communication Method, Deadline, and Attachments */}
  //       <div
  //         className={`transition-opacity duration-300 ${
  //           step === 2 ? "opacity-100" : "opacity-0 hidden"
  //         } flex flex-col gap-5`}
  //       >
  //         <BountyCommunicationMethod
  //           communicationMethod={communicationMethod}
  //           setCommunicationMethod={setCommunicationMethod}
  //           error={errors.communicationMethod}
  //         />
  //         <BountyDeadline deadline={deadline} setDeadline={setDeadline} />
  //         <BountyAttachments
  //           attachments={attachments}
  //           setAttachments={setAttachments}
  //         />
  //       </div>

  //       {/* Step Navigation: Next, Back, and Submit */}
  //       <BountyStepNavigation
  //         step={step}
  //         setStep={setStep}
  //         handleNext={handleNext}
  //         handleSubmit={handleSubmit}
  //       />
  //     </BountyFormLayout>

  // );

  return (
    <div className='flex h-[calc(100%_-_76px)] items-center justify-center bg-gradient-to-br from-[#ff5722] to-[#ff9800] p-4'>
      <h1>New Bounty</h1>
    </div>
  )
}
