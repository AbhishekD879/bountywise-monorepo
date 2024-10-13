'use client'
import Image from 'next/image'
import CONSTANT from '@/constants'
import { login, register } from '../../actions' // Import login and register actions
import { useFormState, useFormStatus } from 'react-dom' // Hooks for form state and status
import { InfoIcon } from 'lucide-react' // Icon for error messages
import { Dispatch, SetStateAction, useState } from 'react'
import { useAuth } from '@/lib/hooks/useAuth'
import DisabledWrapper from './DisabledWrapper'
import GoogleAuth from './GoogleAuth'
import AppleAuth from './AppleAuth'
import { useRouter } from 'next/navigation'

interface modelProps {
  isOpen: boolean
  modelStateSetter: Dispatch<SetStateAction<boolean>>
  modelProps: any
}

export default function AuthForm(props: modelProps) {
  console.log('props', props)
  const { modelStateSetter, modelProps } = props
  const router = useRouter()
  if (!modelProps.isSignUpMode) {
    modelProps.isSignUpMode = false
  }
  const [isSignUpMode, setIsSignUpMode] = useState(modelProps.isSignUpMode) // Toggle between signup and login mode
  const [state, authAction] = useFormState(
    isSignUpMode ? register : login, // Dynamically choose login or register action
    null
  )
  const { getCurrentUser } = useAuth() // Fetch authentication status from the custom hook
  if (state?.success) {
    console.log('Login Successful')
    modelStateSetter(false) // Close the model
    getCurrentUser()
    if (modelProps.redirectUrl) {
      router.push(modelProps.redirectUrl)
    }
    return null // Return null to prevent rendering the form again
  }
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* Brand Logo */}
        <Image className='mx-auto h-10 w-auto' alt={CONSTANT.BRAND} width={44} height={44} src='/logo.svg' />

        {/* Form Title */}
        <h2 className='text-gray-900 mt-4 text-center text-2xl font-bold leading-9 tracking-tight'>
          {isSignUpMode ? 'Sign up for an account' : 'Sign in to your account'}
        </h2>

        {/* Error Message */}
        {(state?.error || modelProps.redirectError) && (
          <div className='mt-2 flex items-center justify-center gap-1 text-center'>
            <InfoIcon className='text-center text-sm font-bold !text-destructive' />
            <p className='text-center text-sm font-bold !text-destructive'>
              {state?.error || modelProps.redirectError}
            </p>
          </div>
        )}
      </div>

      <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* Authentication Form */}
        <form action={authAction} className='space-y-2'>
          {/* Email Field */}
          <div>
            <label htmlFor='email' className='text-gray-900 block text-sm font-medium leading-6'>
              Email address
            </label>
            <div className='mt-1'>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                defaultValue='test@test.com'
                className='text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-accentOrange focus-visible:outline-none sm:text-sm sm:leading-6'
              />
            </div>
            {state?.email && <p className='text-sm !text-destructive'>{state.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='password' className='text-gray-900 block text-sm font-medium leading-6'>
                Password
              </label>
              {!isSignUpMode && (
                <div className='text-sm'>
                  <a href='#' className='font-semibold text-accentOrange hover:text-accentOrange/80'>
                    Forgot password?
                  </a>
                </div>
              )}
            </div>
            <div className='mt-1'>
              <input
                id='password'
                name='password'
                type='password'
                defaultValue='test1@test'
                autoComplete='current-password'
                className='text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-accentOrange/60 focus-visible:outline-none sm:text-sm sm:leading-6'
              />
            </div>
            {state?.password?.map((el) => (
              <p className='text-sm text-red-500' key={el}>
                {el}
              </p>
            ))}
          </div>

          {/* Confirm Password (only for Sign Up mode) */}
          {isSignUpMode && (
            <div className='!mb-4'>
              <label htmlFor='confirm-password' className='text-gray-900 block text-sm font-medium leading-6'>
                Confirm Password
              </label>
              <div className='mt-1'>
                <input
                  id='confirm-password'
                  name='confirm-password'
                  type='password'
                  className='text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-accentOrange/60 focus-visible:outline-none sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Submit isSignUpMode={isSignUpMode} />
        </form>

        {/* Social Sign In Buttons */}
        <SocialSignInButtons />
        {/* Toggle Sign In/Sign Up Mode */}
        <div className='mt-4 text-center'>
          <p className='text-gray-500 text-sm'>
            {isSignUpMode ? 'Already have an account?' : 'Not a member yet?'}{' '}
            <a
              href='#'
              onClick={() => setIsSignUpMode(!isSignUpMode)}
              className='font-semibold leading-6 text-accentOrange hover:text-accentOrange/80'
            >
              {isSignUpMode ? 'Sign in' : 'Sign up'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// Submit Button Component
const Submit = ({ isSignUpMode }: { isSignUpMode: boolean }) => {
  const { pending } = useFormStatus()
  return (
    <div>
      <button
        disabled={pending}
        type='submit'
        className='relative flex w-full justify-center rounded-md bg-accentOrange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accentOrange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentOrange disabled:cursor-not-allowed disabled:opacity-50'
      >
        {isSignUpMode ? 'Sign up' : 'Sign in'}
        {pending && <DisabledWrapper />}
      </button>
    </div>
  )
}

// Social Sign In Buttons Component
const SocialSignInButtons = () => {
  return (
    <div>
      <GoogleAuth />
      <AppleAuth />
    </div>
  )
}
