// components/BountyStepNavigation.tsx (Client Component)
'use client'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BountyStepNavigation({ step, setStep, handleNext, handleSubmit }: any) {
  return (
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
  )
}
