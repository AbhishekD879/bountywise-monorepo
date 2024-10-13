'use client'
import { useRef, useState } from 'react'
import BountyAttachments from './_component/BountyAttachments'
import BountyCommunicationMethod from './_component/BountyCommunicationMethod'
import BountyDeadline from './_component/BountyDeadline'
import BountyDescription from './_component/BountyDescription'
import BountyTags from './_component/BountyTags'
import BountyTitle from './_component/BountyTitle'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFormState } from 'react-dom'
import { createBounty } from '@/app/actions'
import CommingSoon from '@/components/ui/CommingSoon'
export default function NewBountyPage() {
  const [state, createBountyAction] = useFormState(createBounty, null)
  const [titleForAi, setTitleForAi] = useState('')
  const [step, setStep] = useState(1)
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

  return (
    <form action={createBountyAction} encType='multipart/form-data' className='h-full w-full'>
      <div className='relative'>
        {/* Step 1 */}
        <div
          className='top-0 flex h-full w-full flex-col justify-between'
          style={{
            position: 'absolute',
            visibility: step === 1 ? 'visible' : 'hidden',
            opacity: step === 1 ? 1 : 0,
            pointerEvents: step === 1 ? 'auto' : 'none'
          }}
        >
          <BountyTitle titleSetter={setTitleForAi} error={state?.title} />
          <BountyDescription error={state?.description} bountyTitle={titleForAi} />
          <BountyTags error={state?.tags} />
          <Button
            type='button'
            onClick={handleNextStep}
            className='ml-auto bg-[#ff5722] text-white transition-all duration-300 hover:bg-[#ff784e]'
          >
            Next
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </div>

        {/* Step 2 */}
        <div
          className='top-0 flex h-full w-full flex-col justify-between space-y-10'
          style={{
            position: 'absolute',
            visibility: step === 2 ? 'visible' : 'hidden',
            opacity: step === 2 ? 1 : 0,
            pointerEvents: step === 2 ? 'auto' : 'none'
          }}
        >
          <BountyCommunicationMethod error={state?.communicationMethod} />
          <BountyDeadline />
          <CommingSoon>
            <BountyAttachments />
          </CommingSoon>
          <div className='mt-8 flex justify-between'>
            <Button
              type='button'
              onClick={() => setStep(1)}
              variant='outline'
              className='border-[#ff5722] text-[#ff5722] transition-all duration-300 hover:bg-[#ff57221a]'
            >
              <ChevronLeft className='mr-2 h-4 w-4' />
              Back
            </Button>
            <Button
              type='submit'
              className='ml-auto bg-[#ff5722] text-white transition-all duration-300 hover:bg-[#ff784e]'
            >
              Post Bounty
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
