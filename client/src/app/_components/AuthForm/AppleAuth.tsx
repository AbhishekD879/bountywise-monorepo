import { useFormStatus } from 'react-dom'
import DisabledWrapper from './DisabledWrapper'

function AppleAuth() {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      type='button'
      className='relative mt-2 flex w-full justify-center rounded-md bg-[#050708] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#050708]/90 focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50'
    >
      <svg
        className='-ml-1 mr-2 h-5 w-5'
        aria-hidden='true'
        focusable='false'
        data-prefix='fab'
        data-icon='apple'
        role='img'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 384 512'
      >
        <path
          fill='currentColor'
          d='M318.7 268c-.2-37.2 16.5-64.6 51.5-86.4-19-27.8-47.6-43.6-85-48.3-35.6-4.3-74.3 21.5-87 21.5-12.9 0-55.5-20.7-81.1-20.1-41.7.6-82 24.7-103.9 62.8-44.6 77.5-11.5 192.3 31.7 255.1 21.2 31.1 46.4 66 79.6 64.7 31.6-1.3 43.5-20.5 81-20.7 37.3-.2 48.2 20.6 81.1 20 33.6-.6 54.8-31.5 75.2-62.7 12.8-19.6 17.5-29.6 27.5-51.7-72.5-27.4-85.2-127.5-12.8-168.4z'
        ></path>
      </svg>
      Sign in with Apple
      {pending && <DisabledWrapper />}
    </button>
  )
}

export default AppleAuth
