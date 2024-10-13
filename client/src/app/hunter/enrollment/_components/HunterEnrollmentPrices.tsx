// components/HunterEnrollmentPrices.tsx (Client Component)
'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function HunterEnrollmentPrices({
  pricePerMinute,
  setPricePerMinute,
  pricePerHour,
  setPricePerHour
}: {
  pricePerMinute: string
  setPricePerMinute: any
  pricePerHour: string
  setPricePerHour: any
}) {
  return (
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
  )
}
