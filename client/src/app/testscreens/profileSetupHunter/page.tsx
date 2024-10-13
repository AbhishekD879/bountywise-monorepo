'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'

export default function ProfileSetupHunter() {
  const [fullName, setFullName] = useState('')
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
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
  const [newExpertise, setNewExpertise] = useState('')
  const newExpertiseInputRef = useRef<HTMLInputElement>(null)

  const predefinedExpertise = ['Law', 'Finance', 'Tech', 'Marketing', 'Design']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB')
        return
      }
      setProfilePicture(file)
    }
  }

  const handleExpertiseChange = (value: string) => {
    if (expertise.includes(value)) {
      setExpertise(expertise.filter((e) => e !== value))
    } else if (expertise.length < 5) {
      setExpertise([...expertise, value])
    } else {
      alert('You can select up to 5 fields of expertise')
    }
  }

  const handleAddNewExpertise = () => {
    if (newExpertise && !expertise.includes(newExpertise) && expertise.length < 5) {
      setExpertise([...expertise, newExpertise])
      setNewExpertise('')
      if (newExpertiseInputRef.current) {
        newExpertiseInputRef.current.focus()
      }
    } else if (expertise.length >= 5) {
      alert('You can select up to 5 fields of expertise')
    }
  }

  const handleAvailabilityChange = (day: string, type: 'start' | 'end', value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }))
  }

  return (
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>Hunter Profile Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='fullName'>Full Name</Label>
            <Input
              id='fullName'
              placeholder='Enter your full name'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              minLength={2}
              maxLength={256}
              className='border-gray-300'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='profilePicture'>Profile Picture</Label>
            <div className='flex items-center space-x-4'>
              <div className='bg-gray-200 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full'>
                {profilePicture ? (
                  <Image
                    src={URL.createObjectURL(profilePicture)}
                    alt='Profile'
                    className='h-full w-full object-cover'
                  />
                ) : (
                  <svg
                    className='text-gray-400 h-12 w-12'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    ></path>
                  </svg>
                )}
              </div>
              <Input
                id='profilePicture'
                type='file'
                accept='.jpg,.jpeg,.png'
                onChange={handleFileChange}
                className='hidden'
              />
              <Button
                type='button'
                onClick={() => document.getElementById('profilePicture')?.click()}
                className='bg-orange-500 text-white hover:bg-orange-600'
              >
                Upload Picture
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Fields of Expertise (up to 5)</Label>
            <div className='mb-2 flex flex-wrap gap-2'>
              {predefinedExpertise.map((field) => (
                <Badge
                  key={field}
                  variant={expertise.includes(field) ? 'default' : 'outline'}
                  className={`cursor-pointer ${expertise.includes(field) ? 'bg-orange-500' : ''}`}
                  onClick={() => handleExpertiseChange(field)}
                >
                  {field}
                </Badge>
              ))}
            </div>
            <div className='flex gap-2'>
              <Input
                ref={newExpertiseInputRef}
                placeholder='Add custom expertise'
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddNewExpertise()
                  }
                }}
                className='border-gray-300'
              />
              <Button
                type='button'
                onClick={handleAddNewExpertise}
                className='bg-orange-500 text-white hover:bg-orange-600'
              >
                Add
              </Button>
            </div>
            <div className='mt-2 flex flex-wrap gap-2'>
              {expertise.map((field) => (
                <Badge
                  key={field}
                  variant='default'
                  className='cursor-pointer bg-orange-500'
                  onClick={() => handleExpertiseChange(field)}
                >
                  {field} ✕
                </Badge>
              ))}
            </div>
          </div>

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

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='pricePerMinute'>Price per Minute ($)</Label>
              <Input
                id='pricePerMinute'
                type='number'
                placeholder='0.00'
                value={pricePerMinute}
                onChange={(e) => setPricePerMinute(e.target.value)}
                required
                min='0'
                step='0.01'
                className='border-gray-300'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='pricePerHour'>Price per Hour ($)</Label>
              <Input
                id='pricePerHour'
                type='number'
                placeholder='0.00'
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                required
                min='0'
                step='0.01'
                className='border-gray-300'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Availability Schedule</Label>
            {Object.entries(availability).map(([day, times]) => (
              <div key={day} className='flex items-center space-x-2'>
                <span className='w-24'>{day}</span>
                <Select onValueChange={(value) => handleAvailabilityChange(day, 'start', value)}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Start time' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                        {`${hour.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>to</span>
                <Select onValueChange={(value) => handleAvailabilityChange(day, 'end', value)}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='End time' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                        {`${hour.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <Button type='submit' className='w-full bg-orange-500 text-white hover:bg-orange-600'>
            Save Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
