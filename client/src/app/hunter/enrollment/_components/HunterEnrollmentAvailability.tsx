// components/HunterEnrollmentAvailability.tsx (Client Component)
'use client'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function HunterEnrollmentAvailability({
  availability,
  setAvailability
}: {
  availability: { [key: string]: { start: string; end: string } }
  setAvailability: any
}) {
  const handleAvailabilityChange = (day: string, type: 'start' | 'end', value: string) => {
    setAvailability((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }))
  }

  return (
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
  )
}
