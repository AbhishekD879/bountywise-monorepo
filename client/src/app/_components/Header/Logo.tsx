import CONSTANT from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
// Define the Logo component
export const Logo: React.FC = () => {
  return (
    <Link href='/' className='flex flex-1 items-center gap-px'>
      <Image alt={CONSTANT.BRAND} width={44} height={44} src='/logo.svg' />
      <span className='text-2xl font-semibold first-letter:text-4xl first-letter:font-normal'>{CONSTANT.BRAND}</span>
    </Link>
  )
}
