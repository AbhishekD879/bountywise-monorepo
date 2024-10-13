// components/HunterEnrollmentForm.tsx (Client Component)
'use client'
import { useState, useRef } from 'react'
import HunterEnrollmentExpertise from './HunterEnrollmentExpertise'
import HunterEnrollmentAvailability from './HunterEnrollmentAvailability'
import HunterEnrollmentProfilePicture from './HunterEnrollmentProfilePicture'
import HunterEnrollmentPrices from './HunterEnrollmentPrices'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function HunterEnrollmentForm() {
  const [fullName, setFullName] = useState('')
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [expertise, setExpertise] = useState<string[]>([])
  const [bio, setBio] = useState('')
  const [pricePerMinute, setPricePerMinute] = useState('')
  const [pricePerHour, setPricePerHour] = useState('')
  const [availability, setAvailability] = useState<{
    [key: string]: { start: string; end: string }
  }>({
    Monday: { start: '', end: '' },
    Tuesday: { start: '', end: '' },
    Wednesday: { start: '', end: '' },
    Thursday: { start: '', end: '' },
    Friday: { start: '', end: '' },
    Saturday: { start: '', end: '' },
    Sunday: { start: '', end: '' }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here, you can send the form data to the server
    console.log({
      fullName,
      profilePicture,
      expertise,
      bio,
      pricePerMinute,
      pricePerHour,
      availability
    })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <HunterEnrollmentProfilePicture profilePicture={profilePicture} setProfilePicture={setProfilePicture} />

      <HunterEnrollmentExpertise expertise={expertise} setExpertise={setExpertise} />

      <div className='space-y-2'>
        <Label htmlFor='bio'>Bio/Description</Label>
        <Textarea
          id='bio'
          placeholder='Write a short bio or description'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={1000}
          className='border-gray-300'
        />
        <p className='text-gray-500 text-sm'>{bio.length}/1000 characters</p>
      </div>

      <HunterEnrollmentPrices
        pricePerMinute={pricePerMinute}
        setPricePerMinute={setPricePerMinute}
        pricePerHour={pricePerHour}
        setPricePerHour={setPricePerHour}
      />

      {/* <HunterEnrollmentAvailability
        availability={availability}
        setAvailability={setAvailability}
      /> */}

      <Button type='submit' className='w-full bg-orange-500 text-white hover:bg-orange-600'>
        Save Profile
      </Button>
    </form>
  )
}
